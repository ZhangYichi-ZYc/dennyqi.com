下面我们讨论大语言模型用于预测next token的Transformer架构。Transformer架构有三个基本组件：token的embedding(嵌入)，Attention(注意力机制)， MLP(多层感知机)。我们将深入讨论如何让大模型利用纯粹的数学机制来理解词语、结合上下文、掌握知识。

## Embedding

首先，我们需要把token输入给模型。我们设定一个维度$n$，让每个token都映射到$n$维空间中的坐标（在GPT-3中，取了$n=12288$）。这个过程称为token的embedding(嵌入)。注意到，假设token总数为$N$，那么为区分token而编码只需要$\log N$位。然而一个token的embedding的信息量是$\log(M^{12288})=12288\log M$，其中$M$是每一维上能取的不同数值的个数，可见embedding远不止是为了辨别token，而是为每个token增加了容纳大量信息的可能性。这些信息就应当被理解为token的“语义”。

初始时，每个token应当embedding到怎样的坐标是由模型的参数决定的（这些参数的数量为token数量乘以向量维数）。模型的参数是由预训练决定的。通过观察经过预训练的模型的embedding参数，人们从下面的意义上确实发现了向量坐标与token语义之间的联系——语义对应向量空间的某一方向。人们发现，如果对`man`和`woman`这两个token对应的向量做差，得到的向量恰好和`king`和`queen`做差的向量方向平行。于是我们可以认为`man`减`woman`这一向量方向是大模型所“理解”的“性别”这一语义（而大模型的理解则来自预训练，也即对大规模互联网文本的拟合）。空间维数为$n$意味着该空间有$n$个正交的方向，也即$n$种独立的语义。

## Attention Layer

经过训练好的embedding参数，大模型能够“理解”单个token的“语义”。然而，单单这样是不可能实现大模型对下一token的准确预测的。因为在自然语言中，token的“语义”是依赖于“上下文(context)”的。这体现在：自然语言中的单词是多义的，例如“model”既可以指“大模型”这样的数学结构，也可以表示“模特”这样一种职业；自然语言中的修饰（例如形容词的修饰）会改变单词的语义，例如“tower”指的是一般的“塔”这一大类，而“Effiel tower”就会让tower的语义带上包含“法国”、“金属”等含义（按照上一节中空间方向和语义的对应关系，我们期待Effiel tower中tower向量应该大致表现为普通的tower向量加上一小段“法国”这一方向的向量，再加上一小段“金属”这一方向的向量，等等）。

如果我们希望大模型能准确预测next token，那么大模型必须“注意到(pay attention to” token与token间“上下文”的关系。这不仅表现在某一小范围的修饰，更有可能横跨数十万个token。例如，假如我们希望大模型生成侦探小说，那么当生成“所以凶手是”的next token时，小说中前文的所有线索都会对这下一个单词有影响，大模型应当对前文的所有token都或多或少“pay attention”。

为了让大模型能够拥有像人类一样的对上下文的“注意力”，2017年Google团队发表了一篇名为*Attention is All You Need*的论文，提出了“注意力机制”。这一机制的提出是革命性的，是现代大语言模型最基础的架构。

### Attention (single head)

假设我们要预测某$t$个token之后的next token。这些token经过第一步embedding转化为$t$个向量$\vec E_1,\cdots,\vec E_t$（$n\times 1$）。这些向量的值都是由embedding参数决定的，并且是互相独立的。为了让它们的语义带有上下文信息，我们需要让它们“注意到”彼此，也就是让它们通过相互作用改变彼此的坐标。

Attention机制是这样做的：模型有三个待训练的矩阵（也即矩阵的各个位置都是模型的参数）：query matrix $W_Q$（$d_k \times n$），key matrix $W_K$（$d_k \times n$），value matrix $W_V$（$n \times n$）。在GPT3中，$d_k$取$128$。

首先，让每个$\vec E_i$都左乘$W_Q$，得到$\vec Q_i=W_Q\vec E_i$（$d_k \times 1$）；让每个$\vec E_i$都左乘$W_K$，得到$\vec K_i=W_k\vec E_i$（$d_k \times 1$）。也就是说，我们对token向量分别做某两种特定的线性变换，编码为某两个$d_k$维向量。实验表明，经过完好预训练的模型表现出这样的性质：$\vec K_j$和$\vec Q_k$的内积大小（实际应用中通常还要再除以$\sqrt{d_k}$）反映出token$_j$和token$_k$之间“语义相关性”。$\vec Q_k$就好像在“询问”，$\vec K_j$就好像在“给出回答”。如果$\vec K_j$和$\vec Q_k$的内积很大，就称token$_k$“注意到了(attends to)”token$_j$。

以$\vec K_1,\cdots,\vec K_t$为行，以$\vec Q_1\cdots \vec Q_t$为列，我们得到一张$\vec K_j\cdot \vec Q_k$内积的表格，称为Attention Pattern Grid。我们把表格的每一列用softmax做归一化，就关于每个$\vec Q_i$得到了一个概率分布，反映出其他的每个token$_j$与token$_i$的相关程度。<u>以这个概率为权重</u>，我们要让token$_j$“修改”token$_i$的语义，这通过令$\vec E_j$左乘上$W_V$得到$\vec V_j=W_V \vec E_j$，让概率权重$\text{softmax}(\dfrac{\vec K_j \vec Q_i}{\sqrt{d_k}})$乘以$\vec V_j$累加到$\vec E_i$上。也就是说，我们需要训练$W_V$来使得该线性变换具有“计算token的语义‘影响’方向”的性质。

综合起来，Attention机制可以总结为以下计算：

$$
\vec E_i'=E_i+\sum\limits_{j\in [t]}\text{softmax}(\dfrac{\vec K_j \vec Q_i}{\sqrt{d_k}})\vec V_j
$$

### Multi-Head Attention

在以上设计中，我们注意到不同token对之间的注意力是用同样的矩阵$W_Q,W_K$实现的，不同token产生的影响方向也是通过同样的矩阵$W_V$计算的。这不符合直觉，在实践中也确实无法得到好的表现。这是因为，某一组特定的$W_Q,W_K,W_V$只反应出某一种“特定的注意力模式”。就好像，“形容词对名词的修饰”是一种注意力模式，而“前一名词对后一名词做范围上的限定”就对应另一种注意力模式了。

因此，采用多种不同的注意力模式能使得大模型表现更好。在GPT3模型中，共采用了96组套不同的注意力模式，也就是有96套$\{W_Q,W_K,W_V\}$，它们会并行地计算出了96个$\Delta E_i^{(k)}$。我们最终把所有这些$\Delta E_i^{(k)}$<u>加在一起</u>，得到$\vec E_i'=E_i+\sum\limits_{k=1}^{96}\Delta E_i^{(k)}$。这就是Multi-Head Attention注意力机制。

### 局限性

从Attention机制的设计可以看出：为了让上下文对语义产生作用，我们需要一个维护一个上下文长度平方量级的表格来使token间互相“注意”。这就使得大模型能注意到的上下文长度难以扩展，我们很难想象用$10^{14}$量级的参数来实现$10^7$量级的输入长度。这是Transformer架构难以克服的困难。

## Multi-Layer Perceptron

认为“语义可以对应向量”这一假设蕴含着“语义具有叠加性，因为向量具有叠加性”。因此当我们询问某一向量是否“包含某一语义”时，我们应当考察这一向量在“这一语义方向上的投影”。例如，“Michael Jordan”这一token（单词）同时具有“first name is Machael”与“last name is Jordan”以及“plays basket ball”等等的多个语义，那么Michael Jordan应当在这些方向上具有正的投影，在那些不具有那些性质的方向上投影为0。

我们说大模型能够获得关于世界的知识储备（对世界的认识），这就是说大模型能够在不同的token之间产生和人类认知接近的联系。例如，大模型能够把“Michael Jordan”与“plays basketball”这两串token联系起来。这些“知识”就存储在大模型的参数中。根据我们的分析，这正是因为经过训练的大模型能在embedding “Michael Jordan”叠加“plays basketball”这一方向的语义。显然，这一信息应当来自于互联网文本。由于互联网文本中“Michael Jordan”总是和“plays basketball”相伴出现，“Michael Jordan”的embedding就产生了“plays basketball”这一方向的倾向。

这里的数学机制蕴含在Multi-Layer Perceptron(多层感知机)这一架构内：在token的向量经过attention layer以后，还将经过一个多层感知机。每个向量$\vec E_i$首先左乘一个预训练的矩阵$W_1$（$(4n) \times n$），然后经过一个ReLU（$f(x)=\max\{x,0\}$），然后再左乘一个预训练好的矩阵$W_2$（$n\times (4n)$），将得到的向量加到原来的向量$\vec E_i$上：

$$
\vec E_i'=\vec E_i+W_2 \cdot \text{ReLU}(W_1\vec E_i)
$$

注意到：$W_1$有$4n$个行向量， 它们分别会和$\vec E_i$做点积，这对应着$\vec E_i$在这$4n$个“语义”的方向上做投影，相当于询问“token$_i$是否具有性质...？”；那么就容易理解ReLU其实是在对得到的结果做一个整理，如果投影为负就整理为0（防止负方向对其他方向的语义产生误导），否则不变，这样得到的向量具有某个性质当且仅当这个向量在这个维度上有值；$W_2$可以看作$4n$个列向量，恰好代表$W_1$中每个行向量的语义对应的方向，它们将会以$\text{ReLU}(W_1\vec E_i)$的各个维度加权累加起来加到$\vec E_i$上。这样，假设“Michael Jordan”在$W_1$上做投影在“是否会打篮球”这一维度上为正，整流以后就会在$W_2$的“是否会打篮球”这一列向量上附加一定的权重，这样加到$\vec E_i$上，哪怕$\vec E_i$本身在“plays basketball”这一方向上投影为0，$\vec E_i'$在这一方向上也会产生正的投影了，也就说明经过多层感知机以后，模型就可以<u>从embedding阶段</u>得知了“Michael Jordan”这一token具有“plays basketball”这一性质。

在GPT3中，每个token都要独立地经过多层感知机。GPT3总共会让token经历96个不同的“Attention - MLP”的架构，也就是把“根据上下文调整语义，然后提炼知识”的过程用不同方式进行96次。这样，大模型就渐渐在embedding某个token时获得了人类使用该token的习惯，也就是掌握了该token的“语义”。

## Unembedding

综上所述，在输入token串经过embedding与多轮“Attention - MLP”架构以后，我们得到了经过变换的token向量串。这里我们做一个假设，认为整个文本串的信息都已经吸纳到最后一个token的向量上（因为模型就是这样训练的，所以会具有这样的性质）。我们用一个预训练好的矩阵$W_U$（$n \times n$）乘以这最后一个向量，并对结果用softmax做归一化，认为这样得到的结果就是对下一个单词的预测的概率分布。这整个过程就称为Transformer结构。在预测next token时，我们只需按照概率分布采样即可，或者简单地选择概率最大的那个token输出。

## Reference

3Blue1Brown, YouTube, *Deep Learning Series*



















