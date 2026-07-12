> The real measure of information is not in the symbols we send -- it's in the symbols we could have sent, but did not.

## 信息与随机事件

“信息(information)”的含义是什么呢？在日常语言中，我们会这样使用“信息”这一词汇：这一句话是信息量很大的；这是一句废话（信息量几乎为0）；等等。我们能否用数学语言定义何为信息（量）呢？

信息与“通信(communication)”密不可分。通信双方发生的基本物理过程可以概括如下：A和B通信的目的是A要把某一“信息”传达给尚不知晓这一信息的接收方B。A通过某一物理活动，把某种未知转化为了一个已知结果，但是在A得知结果时B还尚未得知结果，因此A要把这一结果用某种方式传递给B。当B得知了这一结果以后，通信过程结束。

考虑一个最简单的场景：A和B分别位于不同的房间内，房间之间连接着一根能发送0或1的电脉冲的导线。现在A在房间内进行一次抛均匀硬币的实验，得到实验结果以后，A要用导线把结果告诉B。要完成这一点，有一个很简单的方案：A和B事先约定，如果正面朝上，发送信号0；如果反面朝上，发送信号1。可见，无论如何，我们只需要一个二进制位(bit)就能传递“抛均匀硬币的实验结果”这一信息。

如果场景稍微复杂一些，A在房间内抛一个八面体的均匀骰子，那么就有八种可能结果，因此要把信息传递给B，至少需要3个二进制位。如果少于3个二进制位，B永远都不可能推断出A的实验结果究竟是什么。

抛硬币只需要1个二进制位就足够传递信息，而抛骰子却需要3个二进制位。所以我们说，“抛骰子的结果”的信息量要比“抛硬币的结果”的信息量更大。为什么后者必须要用更多的位数呢？因为抛骰子这一随机事件比抛硬币这一随机事件的不确定性更大。抛硬币时，B事先知道结果只有两种，A在通知它结果以后只帮B排除了一种情况；抛骰子时，B事先知道结果可能有8种，A通知它以后立即帮B排除了其余的7种情况。抛骰子这一随机事件的结果的不确定性比抛硬币更大。得知一个不确定性更大的事件的结果意味着得知更多的信息。由此可见，信息量的大小来源于所消除的不确定性的大小。

按照这样的思路，我们很容易把信息量的定义推广到一般情形。对于任何一个随机事件，其结果的可能情况越多，得知其结果时所获得的信息量就越大。假如一个随机事件有$n$种可能的结果，那么描述其结果至少需要$\log_2 n$个二进制位。

## 熵(Entropy)$\newcommand{\E}{\mathbb{E}}$

然而我们认识到，以上的对信息的描述方式并不精确。按照以上说法，信息似乎只与随机变量的“取值个数”有关，而并不与具体的“分布”有关。比如，如果我们抛的是一个带有倾向性的硬币——正面概率为60%，反面概率为40%。按照以上说法，在得知抛这枚带有倾向性的硬币的结果时，我们所获得的信息量是和抛均匀硬币时相同的。当我们把这种“倾向性”推广到极端，就会立刻意识到不对劲：假如某一硬币正面向上的概率为99.99%，反面向上的概率为0.01%，那么我们在得知其结果的时候会如何反应呢？如果我们得知结果为“正面向上”，我们会觉得这几乎是一句废话，信息量几乎为0；但是如果我们得知结果为“反面向上”，我们会非常惊讶，好像发生了一件非常神奇的事情。换言之这一结果包含很大的信息量。就好像，对于一个常年干旱的地区，如果你告诉那里的居民“明天不会下雨”，居民会觉得你这句话没任何价值；但是如果你说“明天会下雨”，居民就会认为这句话有很大的信息量。

我们应当定义一个<u>关于分布</u>的函数，作为对信息量的数学描述。我们对这一描述会有一些先验的要求。首先，对于均匀分布，信息量应当等于可能情况的对数。其次，从上面的例子不难想到，这应当是一个连续的函数——这正是我们用“极端法”论证的基础，既然100%正面向上的硬币的结果毫无信息可言，那么99%正面向上的硬币的结果信息量也不会太大。最后，信息量还应当满足链式法则：设分布$\{p_1,\cdots,p_n\}$对应的信息量为$H(p_1,\cdots,p_n)$，考虑一个不均匀分布的随机变量$X$，$X=a$的概率为$1/2$，$X=b$的概率为$1/3$，$X=c$的概率为$1/6$。那么，$X$的分布为$\{1/2,1/3,1/6\}$，这个分布对应的信息量为$H(1/2,1/3,1/6)$，我们可以这样理解信息量：当我们想要获取$X$的取值时，首先询问是否成立$X=a$，这个问题的答案的信息量为$H(1/2,1/2)$；如果答案为否（这一事件发生的概率为$1/2$），那么我们再次询问是否成立$X=b$，这个问题的答案的信息量为$H(2/3,1/3)$。所以，$H$应当满足以下分解性质：$H(1/2,1/3,1/6)=H(1/2,1/2)+1/2H(2/3,1/3)$。

综上所述，我们想找的函数$H(p_1,\cdots,p_n)$要满足以下三条基本性质：

1. $H$是连续函数；
2. $H(1/n,\cdots,1/n)=\log_2 n$；
3. $H(p_1,\cdots,p_{n-1},\alpha p_n,(1-\alpha)p_n)=H(p_1,\cdots,p_{n-1},p_n)+p_nH(\alpha,1-\alpha)$

我们来推导这三条性质的必要条件：对于任何一个离散的分布$\{p_1,\cdots,p_n\}$，如果$p_i$都是有理数，我们总可以设存在整数$n_1,\cdots,n_n$使得$p_i=\dfrac{n_i}{\sum n_i}$。所以分布$\{p_1,\cdots,p_n\}$可以分解为$\sum n_i$的均匀分布，并且该分解满足性质3。这意味着，$\log_2(\sum n_i)=H(p_1,\cdots,p_n)+\sum p_i\log_2(n_i)$。这就导出了$H(p_1,\cdots,p_n)=-\sum p_i\log_2(n_i)+\log_2(\sum n_i)$ $=-\sum p_i\log_2(n_i)+\sum p_i\log_2(\sum n_i)$$=-\sum p_i\log_2(\dfrac{n_i}{\sum n_i})$ $=-\sum p_i\log_2 p_i$。

于是，我们找到了这个著名的表达式$H(p_1,\cdots,p_n)=-\sum p_i\log_2 p_i$。经检验，它满足我们提出的三个要求。这一结果最早出现在香农(Shannon)在1948年发表的名为*A Mathematical Theory of Communication*的论文中。文中把这一函数和统计力学中的Boltzmann定理联系起来，把这个函数命名为entropy(熵)。由于这是用于刻画信息量的熵，所以称为信息熵。

因为熵是关于离散概率分布的函数，所以对于任何离散随机变量$X$，我们可以定义随机变量的信息熵。假设$X$概率质量函数为$p(x)$，其中$p(x)=Pr[X=x]$，则定义$X$的熵为$H(X)=-\sum\limits_{x\in\mathcal{X}}p(x)\log p(x)$。其中$\mathcal{X}$是所有$p(x)>0$的$x$构成的集合。

现在我们来看我们导出的这一表达式的含义。我们可以把熵写成这样的形式：$H(p_1,\cdots,p_n)=\sum p_i \log \dfrac{1}{p_i}$。这很容易写作期望的形式：$H(p_1,\cdots,p_n)=\E[\log \dfrac{1}{p_i}]$。$\log \dfrac{1}{p_i}$这一项的含义是什么呢？根据之前举的例子，这就可以看作是随机事件的每种结果带给我们的“惊讶程度”：当我们抛一枚99%正面朝上的硬币时，正面朝上带给我们的惊讶程度为$\log \dfrac{100}{99}$，这是一个很接近0的小量，我们对这个结果丝毫不感到惊讶；反面朝上带给我们的惊讶程度为$\log \dfrac{100}{1}\approx 6.64$。最终，整个事件的信息量是各个情况的惊讶程度的期望，也就是我们的平均惊讶程度。尽管$6.64$的惊讶值很高，但只有$1%$的概率会发生。最终，我们的平均惊讶程度为$0.01\times 6.64+0.99\times 0.01\approx 0.0763$。

对于一个随机变量$X$，当其均匀分布时，它就具有最大的熵。只要分布稍不均匀，熵就会降低。我们可以证明这一点：均匀分布时，$H(X)=\log |\mathcal{X}|$。而对于$H(X)=\sum\limits_{x\in \mathcal{X}} p(x)\log \dfrac{1}{p(x)}$，我们把它看作在上凸函数$\log x$上分别以$p(x)$的权重选取$x_i=\dfrac{1}{p(x)}$，由Jensen不等式可得$H(X) \leq \log\left(\sum\limits_{x\in \mathcal{X}}p(x) \cdot \dfrac{1}{p(x)}\right)=\log |\mathcal{X}|$。当且仅当$p(x)=\dfrac{1}{| \mathcal{X}|}$时取到等号。由此可见，离散的随机变量的熵始终满足$0\leq H(X)\leq \log |\mathcal{X}|$，均匀分布时取到最大值。

## 联合熵(Joint Entropy)

两个随机变量的联合分布可以导出“联合熵”。这是很自然的，因为熵是一个仅仅关于分布的函数，只需要一系列离散的概率密度就可以定义。设$X,Y$有联合分布的密度函数$p(x,y)$，那么定义$X,Y$的联合熵为$H(X,Y)=-\sum\limits_{x \in \mathcal{X}}\sum\limits_{y \in \mathcal{Y}}p(x,y)\log p(x,y)$。从期望的角度，$H(X,Y)=-\E[\log p(X,Y)]$。事实上，我们可以把$(X,Y)$看作一个整体（一个随机向量），那么$X,Y$联合分布的概率密度实际就是这单个随机向量的概率分布，它衡量这个随机向量（另一个新的随机变量）的不确定性。从对称性容易看出，$H(X,Y)=H(Y,X)$。

容易验证，如果$X=Y$，那么$p(x,y)>0$当且仅当$x=y$，$p(x,x)=p(x)$，代入定义式可得$H(X,X)=-\sum\limits_{x \in \mathcal{X}}\sum\limits_{y \in \mathcal{X}}p(x,y)\log p(x,y)=-\sum\limits_{x \in \mathcal{X}}p(x,x)\log p(x,x)$ $-\sum\limits_{x\in\mathcal{X}}p(x)\log p(x)=H(X)$。所以，两个相同的随机变量的联合熵就等于单个随机变量的熵。从信息量的角度，增加一个相同的随机变量并没有增加信息量。

如果$X$是$Y$的函数，也即$Y$确定时$X$会被唯一确定，那么$y$确定时使得$p(x,y)>0$的只有唯一的$x$，因此$p(x,y)=p(y)$。于是代入定义可得$H(X,Y)=-\sum\limits_{x \in \mathcal{X}}\sum\limits_{y \in \mathcal{Y}}p(x,y)\log p(x,y)$ $=-\sum\limits_{y \in \mathcal{Y}}p(y)\log p(y)=H(Y)$。$X$的信息完全被包含在$Y$以内，因此增加$X$并不能带来更多的信息。

如果$X,Y$独立，那么$p(x,y)=p(x)p(y)$。那么$H(X,Y)=-\sum\limits_{x \in \mathcal{X}}\sum\limits_{y \in \mathcal{Y}}p(x)p(y)[\log p(x)+\log p(y)]$ $=-\sum\limits_{x \in \mathcal{X}}p(x)\log p(x)\sum\limits_{y \in \mathcal{Y}}p(y)-\sum\limits_{x \in \mathcal{X}}p(x)\sum\limits_{y \in \mathcal{Y}}p(y)\log p(y)$$=H(X)+H(Y)$。两个独立的随机变量的熵恰好是它们熵的和。$X,Y$中并没有互相重叠的信息。

联合熵可以继续推广到多元：定义$H(X_1,\cdots,X_n)=-\sum p(x_1,\cdots,x_n)\log p(x_1,\cdots,x_n)$ $=-\E[\log p(X_1,\cdots,X_n)]$。

## 条件熵(Conditional Entropy)

由随机变量的条件分布可以导出条件熵。对于两个离散随机变量$X,Y$，$p(Y\mid X=x)$依然是一个概率分布，由此定义$H(Y\mid X=x)=-\sum\limits_{y\in \mathcal{Y}}p(y\mid X=x)\log p(y\mid X=x)$。从期望的角度，可以写作$-\E[\log p(y\mid X=x)]$。基于$H(Y\mid X=x)$，定义$X,Y$的条件熵$H(Y \mid X)=\sum\limits_{x \in \mathcal{X}}p(x)H(Y\mid X=x)$。它表示已知$X$时$Y$的不确定性，而“已知$X$”是期望意义下的已知。展开$H(Y\mid X=x)$这一项，得到$H(Y\mid X)=-\sum\limits_{x \in \mathcal{X}}\sum\limits_{y \in\mathcal{Y}}p(x)p(y\mid x)\log p(y\mid x)$。而$p(x)p(y\mid x)=p(x,y)$，因此得到条件熵的一般表达式$H(Y\mid X)=-\sum\limits_{x \in \mathcal{X}}\sum\limits_{y \in\mathcal{Y}}p(x,y)\log p(y\mid x)$ $=-\E[\log p(Y\mid X)]$。

注意，$H(X\mid Y)$一般不等于$H(Y \mid X)$。但可以证明：$H(X\mid Y)+H(Y)=H(Y\mid X)+H(X)=H(X,Y)$。这称为熵的计算的链式法则。这可以从概率的链式法则$p(x,y)=p(x\mid y)p(y)$直接导出：从期望的角度，$H(X,Y)=-\E[\log p(X,Y)]=-\E[\log p(X\mid Y)+\log p(Y)]$ $=H(X\mid Y)+H(Y)$。另一个是对称的。推广到$n$元情形：$H(X_1,\cdots,X_n)=\sum\limits_{i=1}^{n}H(X_i\mid X_{i-1},\cdots,X_1)$。

同样的，根据条件概率的定义容易验证$p(x,y\mid z)=p(x\mid z)\cdot p(y\mid x,z)$。用同样的方法可以证明$H(X,Y\mid Z)=H(X\mid Z)+H(Y\mid X,Z)$。

当$X$是$Y$的函数时，$H(X,Y)=H(Y)$。而$H(X,Y)=H(Y)+H(X\mid Y)$，可见此时$H(X\mid Y)=0$，$Y$已知时$X$没有任何不确定性。而反过来，如果$H(X\mid Y)=0$，那么$\sum\limits_{x \in \mathcal{X}}\sum\limits_{y \in\mathcal{Y}}p(x,y)\log p(x\mid y)=0$，这当且仅当$p(x\mid y)$恒等于1，也即$y$确定$x$确定，$X$是$Y$的函数。综上我们得到，$X=f(y)\iff H(X\mid Y)=0$。

## Mutual Information(互信息)

比较$H(Y\mid X)$与$H(Y)$的大小，从直观上，“X已知”本身提供了信息，这一信息势必会使得$Y$的不确定性降低，或至少不会让$Y$变得更不确定。因此应当成立不等式$H(Y \mid X)\leq H(Y)$。什么时候成立等号呢？代入$H(Y\mid X)=H(X,Y)-H(X)$，等号成立时$H(X,Y)=H(X)+H(Y)$。我们先前验证了，如果$X,Y$是独立的，那么这个等式就成立。直观上，这个不等式（也即差值$H(Y)-H(Y\mid X)$）在衡量随机变量$X,Y$之间<u>距离独立还有多远</u>。我们定义这个差值为$X,Y$的互信息$I(X;Y)=H(Y)-H(Y\mid X)$（或对称的$I(X;Y)=H(X)-H(X\mid Y)$）。代入化简可得$I(X;Y)=\sum\limits_{x \in \mathcal{X}}\sum\limits_{y \in \mathcal{Y}}p(x,y)\log \dfrac{p(x,y)}{p(x)p(y)}$。互信息具有对称性：$I(X;Y)=I(Y;X)$。从信息的角度，它描述$X,Y$之间有多少共同的信息。如果没有共同的信息（独立），那么互信息为0。

事实上，表达式$\sum\limits_{x \in \mathcal{X}}p(x)\log \dfrac{p(x)}{q(x)}$是一种用来衡量分布之间“距离”的一般方式，它称为Kullback-Leibler距离，记为$D(p(x)||q(x))$，又称为分布分别为$p,q$的两个随机变量的相对熵(Relative Entropy)。互信息可以用KL距离写作$I(X;Y)=D(p(x,y)||p(x)p(y))$。（注意，Kullback-Leibler距离是不具有对称性的）

下面我们证明，始终成立$D(p(x)||q(x))\geq 0$。这是信息论中最重要的不等式之一，称为信息不等式(Information Inequality)。根据定义，$D(p(x)||q(x))=\sum\limits_{x \in \mathcal{X}}p(x)\log \dfrac{p(x)}{q(x)}=-\sum\limits_{x \in \mathcal{X}}p(x)\log \dfrac{q(x)}{p(x)}$。由于$\log$是上凸函数，根据Jensen不等式有$\sum\limits_{x \in \mathcal{X}}p(x)\log \dfrac{q(x)}{p(x)}\leq\log \left(\sum\limits_{x \in \mathcal{X}} p(x)\cdot \dfrac{q(x)}{p(x)}\right)$ $=\log 1 = 0$。因此$D(p||q)\geq 0$。由于Jensen不等式只在所有点都重合时取等，因此当且仅当$p,q$为同一分布时$D(p||q)=0$。由$I(X;Y)=D(p(x,y)||p(x)p(y))$，可得$I(X;Y)\geq 0$。信息不等式表明，互信息始终是非负的！

> 作为例子，我们取$q$为均匀分布，也即$q(x)\equiv \dfrac{1}{|\mathcal{X}|}$，那么$D(p||q)=\sum\limits_{x}p(x)\log p(x)+\sum\limits_xp(x)\log |\mathcal{X}|$ $=\log|\mathcal{X}|-H(X)$。由于$D(p||q)\geq 0$，这再次表明$H(X)$只能在均匀分布时取到最大值$\log |\mathcal{X}|$。后续在微分熵中，这是更普适的证明方法。

## 信息图(The Information Diagram)

$X,Y$的熵、联合熵、互信息始终满足$H(X,Y)=H(X)+H(Y)-I(X;Y)$。这意味着，我们可以用韦恩图来理解熵与互信息的关系：$H(X),H(Y)$是单个圆的面积，$H(X,Y)$是并集的面积，而$I(X;Y)$是交集的面积。$H(X\mid Y)$是$Y$去掉$X$部分的面积，$H(Y\mid X)$是$X$去掉$Y$部分的面积。

<div align=center><img src="https://blog-static.cnblogs.com/files/qixingzhi/diagram1.gif?t=1714977780&download=true" alt="image-20240304165448878" style="zoom:33%;" /></div>

我们可以把信息图推广到以下的三元情形：

<div align=center><img src="https://blog-static.cnblogs.com/files/qixingzhi/diagram2.gif?t=1714977799&download=true" alt="image-20240304165358837" style="zoom:33%;" /></div>

在熵与联合熵中，只会涉及逗号与竖线，其中逗号表示对两块面积取并，竖线表示去除对应部分的面积，逗号的优先级高于竖线。在互信息中，会出现分号，其中分号表示对两块面积取交，分号的优先级高于竖线，低于逗号。综合起来，优先级从高到低为$, > ;>|$。我们可以验证，根据信息图做恒等变形始终是成立的。其中，为$I(X;Y\mid Z)=H(X\mid Z)-H(X\mid Y,Z)$称为条件互信息(Conditional Mutual Information)。条件互信息也具有非负性。$I(X_1;X_2;X_3)$仅仅是一个形式上的记号，它并不是互信息，不具有非负性（它也是信息图中唯一可能取负值的一片区域。我们可以证明，当$X=Y=Z$时$I(X;Y;Z)>0$，而$Z=X+Y$时$I(X;Y;Z)<0$。）

信息图为我们完整描述了三元以内的所有熵与互信息之间的等式关系。而对于三元以上的信息图，我们不能找到一个把它在平面上画出来的简单方式。但是可以验证，以下基于信息图的理解经过验证在三元以上的情形也是正确的：

①熵的链式法则：$H(X_1,\cdots,X_n)=\sum\limits_{i=1}^{n}H(X_i\mid X_1,\cdots,X_{i-1})$（一系列面积取并，等价于每次累加一个新面积去除已经计算过的所有面积）；

②互信息的链式法则：$I(X_1,\cdots,X_n;Y)=\sum\limits_{i=1}^{n}I(X_i;Y\mid X_{i-1},\cdots,X_1)$（一系列面积与另一个面积取交，等价于每次累加一个面积与它的交去除所有已经计算过的部分）；

③互信息与熵的转化：$I(X_1,\cdots,X_n;Y)=H(X_1,\cdots,X_n)-H(X_1,\cdots,X_n\mid Y)$（将$(X_1,\cdots,X_n)$看作一个随机向量）；

把$H(X\mid Y)\leq H(X)$中的$X,Y$看作随机向量推广到多元，可以验证不等式依然成立。那么基于熵的链式法则$H(X_1,\cdots,X_n)=\sum\limits_{i=1}^{n}H(X_i\mid X_1,\cdots,X_{i-1})$，可以得到以下不等式，称为The Independence Bound: $H(X_1,\cdots,X_n)\leq\sum\limits_{i=1}^{n}H(X_i)$。这直观上表明$n$个随机变量联合熵总是不超过各自熵的和。这种系统间的相互影响（重叠的信息）而造成的。如果$n$个变量全都互相独立，那么恰好取到等号。这个不等式可以看作信息不等式的一个推论。信息图中真正本质的不等关系只有信息不等式一个（而它的本质是Jensen不等式）。

> 同样的，基于$D(p||q)=\E_p\left[\log \dfrac{p(x)}{q(x)}\right]$，可以定义条件相对熵(Conditional Relative Entropy) $D(p(y\mid x)||q(y\mid x))=\E_{p(x,y)}\left[\log \dfrac{p(Y\mid X)}{q(Y\mid X)}\right]$ $=\sum\limits_{x}\sum\limits_{y}p(x,y)\log \dfrac{p(y\mid x)}{q(y\mid x)}$。
>
> 对于$D(p(x,y)||q(x,y))$，会出现$\log \dfrac{p(x,y)}{q(x,y)}$一项，根据条件概率可以展开为$\log \dfrac{p(x)p(y\mid x)}{q(x)q(y\mid x)}=\log \dfrac{p(x)}{q(x)}+\log \dfrac{p(y\mid x)}{q(y\mid x)}$。因此$D(p(x,y)||q(x,y))=D(p(x)||q(x))+D(p(y\mid x)||q(y\mid x))$。这是相对熵的链式法则。

## 马尔科夫链(Markov Chain)

一般来说，根据链式法则，三个随机变量的分布满足$p(x,y,z)=p(x)p(y\mid x)p(z\mid x,y)$。假如我们发现分布可以进一步满足$p(x,y,z)=p(x)p(y\mid x)p(z\mid y)$，也即在$X,Y,Z$的联合分布中$Z$总是只依赖于$Y$而不依赖于$X$，就称这三个随机变量形成了马尔可夫链$X\to Y \to Z$。一个很常见的情形是，$Z=f(Y)$，此时自然有$X \to Y \to f(Y)$。

对于$X\to Y\to Z$，根据马尔可夫链定义，由$p(x,z\mid y)=\dfrac{p(x,y,z)}{p(y)}$ $=\dfrac{p(x)p(y\mid x)p(z\mid y)}{p(y)}$$=\dfrac{p(x,y)p(z\mid y)}{p(y)}=p(x\mid y)p(z\mid y)$。这说明，马尔可夫链<u>等价于</u>在中间随机变量的条件概率意义下，前后的两个事件是独立的。而这样的定义是对称的，因此$X\to Y\to Z$一定同时意味着$Z\to Y \to X$.

对于马尔可夫链，变量之间的互信息满足以下重要的不等式，称为数据处理不等式(Data-processing inequality)：如果$X\to Y \to Z$，那么$I(X;Y)\geq I(X;Z)$。 它表明，在马尔可夫链中相距更近的两个变量之间的关联一定比更远的变量更紧密。仅仅通过处理$Y$的数据来得到的变量$Z$不可能帮助我们获得更多信息。证明如下：由于$X\to Y\to Z$，因此在$Y$的条件下$X,Z$独立，那么有$I(X;Z\mid Y)=0$。根据链式法则，$I(X;Y,Z)=I(X;Z)+I(X; Y\mid Z)$，对称的也有$I(X;Y,Z)=I(X;Y)+I(X;Z\mid Y)=I(X;Y)$。因为$I(X;Y\mid Z)\geq 0$，因此$I(X;Z)\leq I(X;Y)$。

> 根据$I(X;Y)=H(X)-H(X\mid Y)$，$I(X;Z)=H(X)-H(X\mid Z)$，数据处理不等式也可以等价地写为$H(X\mid Y)\leq H(X\mid Z)$。这说明给定一个马尔可夫链上间隔越远的已知条件，对不确定性的约束效果更弱。

在马尔可夫链中，由于$I(X;Z\mid Y)$恒为0，因此我们不需要韦恩图中$(X\cap Z)\setminus Y$那一片区域，因此可以把韦恩图画成三个山峰的形式。多元的马尔可夫链的韦恩图也是类似的（要保证$X_1$和$X_n$相交）。

<div align=center><img src="https://blog-static.cnblogs.com/files/qixingzhi/markov_chain1.gif?t=1714977803&download=true" alt="image-20240304165319733" style="zoom:33%;" /></div>

<div align=center><img src="https://blog-static.cnblogs.com/files/qixingzhi/markov_chain2.gif?t=1714977808&download=true" alt="image-20240304165336326" style="zoom:33%;" /></div>



























