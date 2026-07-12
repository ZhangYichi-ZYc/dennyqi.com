$\newcommand{\E}{\mathbb{E}}$ $\newcommand{\X}{\mathcal{X}}$现在我们要开始讨论熵的意义。讨论的核心就是数据的压缩编码。

首先我们要严格地定义编码。在这里，我们默认用二进制进行编码。事实上，我们将要证明的所有结论对于一般的$\mathcal{D}$进制而言都是成立的。（我们的证明并不是依赖于熵中对数的底数的。在信息论中底数并不重要。）我们定义对随机变量$X$的编码就是$\X\to \{0,1\}^*$的映射$C$，$X$的每个取值对应着一个有限01串。进一步，如果$C$是一个单射，也即如果任意不同的取值对应不同的01串，我们就称$C$是一个nonsingular(非奇异的)的编码方式。对于nonsingular的编码方式，只需要在相邻字符间加上逗号或其它分隔符，就能够通过编码后的串唯一解码出原始的字符串。但在实际应用中，使用分隔符并不是一种高效的做法。如果一种编码方式无需分隔符就可以唯一解码，那么我们称这种编码方式是自带标点(Self-punctuating)的或唯一可解(Uniquely Decodable)的。

## Kraft Inequality

### 前缀码(Prefix Code)

一种常见的唯一可解码称为前缀码(Prefix Code)或即时码(Instantaneous Code)，其中所有编码后的字符不存在其中一个串是另一个串的前缀的情况，那么我们无需分隔符就可以唯一的解码——前缀码是唯一可解码。

当我们要求编码方式必须是前缀码时，我们就不能总是采用最短的可用字符串了。例如如果同时采用$0$和$1$作为编码，那就不可能使用任何其它串了。也就是说，对于$|\X|=n$，如果把需要编码的字符编码后的长度排成一列$\ell_1,\ell_2,\cdots,\ell_n$，这些长度肯定要满足某些约束。例如当$|\X|=3$时，$\{1,1,2\}$肯定不是一个可行的前缀码编码方式，而$\{1,2,2\}$却是可行的。

思考编码问题的一个常见方法是把编码放到前缀树上去思考。在二进制下，编码的前缀树是一棵二叉树。记$\ell_{\max}$是编码最长的字符，那么这一定是一棵深度不超过$\ell_\max$的树。对于前缀树而言，只有叶节点能够作为编码的终点。前缀树可以看作去除了某些子树后的满二叉树。一棵深度为$\ell_\max$的满二叉树，那么第$k$层恰好有$2^k$个节点，在第$\ell_\max$层有$2^{\ell_\max}$个节点。对于长度为$\ell_i$的编码，由于它一定没有后代，所以相较于满二叉树在第$\ell_\max$层会损失共$2^{\ell_{\max}-\ell_i}$个节点。而每个$\ell_i$的后代都是互不重叠的，因此在最后一层上总的损失节点数就是$\sum\limits_{i=1}^{n}2^{\ell_\max-\ell_i}$，它一定不超过$2^{\ell_\max}$。这样我们就得到了不等式$\sum\limits_{i=1}^{n}2^{-\ell_i}\leq 1$。这称为Kraft Inequality。

而一旦我们得到了一个满足Kraft Inequality的序列$\ell_1,\cdots,\ell_n$，那么我们可以直接在01前缀树上构造出一个合法的前缀编码。把$\ell_1,\cdots,\ell_n$从小到大排序，从满二叉树出发，依次找到字典序最小的深度为$\ell_i$的节点，移除它的后代，不断重复如上操作即可。这说明Kraft Inequality是紧的！它恰好刻画了前缀码长度需要满足的充要条件。

另一种理解Kraft Inequality的方法是二进制小数。假设第$i$个二进制编码记为$y_1y_2\cdots y_{\ell_i}$，我们可以把它与二进制小数$0.y_1y_2\cdots y_{\ell_i}$对应。由于不存在与它有相同前缀的编码，我们可以视为这个小数独占了区间$[0.y_1y_2\cdots y_{\ell_i},0.y_1y_2\cdots y_{\ell_i}+2^{-\ell_i})$。这恰好是一个长度为$2^{-\ell_i}$的区间。由于所有编码对应的区间互不重叠，一定有$\sum\limits_{i=1}^{n}2^{-\ell_i}\leq 1$。这样我们就再一次得到了Kraft Inequality。而在这种证明中，即便编码数量是无穷（但是可数）的，这个不等式依然成立。因此，我们得到了更广义的在可数意义下的Kraft Inequality。

### 一般情形的唯一可解码

事实上，我们即将证明Kraft Inequality对于任何唯一可解码都是成立的。并且显然，任何前缀码都是唯一可解的，所以我们得到了以下基于Kraft Inequality的定理：任何唯一可解码的编码长度序列$\ell_1,\cdots,\ell_n$都要满足$\sum\limits_{i=1}^{n}2^{-\ell_i}\leq 1$，并且只要满足就能被构造出来。

对这个定理的证明需要用到巧妙的技巧。要证$\sum\limits_{i=1}^{n}2^{-\ell_i}\leq 1$，我们任取一个正整数$k$，对左式做$k$次方，得到$\left(\sum\limits_{i=1}^{n}2^{-\ell_i}\right)^k$，展开后逐项相乘得到$\sum\limits_{x_1 \in \X}\cdots \sum\limits_{x_k\in \X}2^{-\ell(x_1)}\cdots 2^{-\ell(x_k)}=\sum\limits_{x_1 \in \X}\cdots \sum\limits_{x_k\in \X}2^{-\sum \limits_{j=1}^{k}\ell(x_j)}$。这等价于，我们对$k$个随机变量$X$可能形成的随机串$x^k$编码，每个$x^k$对应着长度$\ell(x^k)=\sum\limits_{j=1}^{l}\ell(x_j)$，也即$\sum\limits_{x^k\in \X^k}2^{-\ell(x^k)}$。设$\ell_1,\cdots,\ell_n$中最大值为$\ell_\max$，显然最长的随机串的长度也不超过$k\cdot \ell_m$。按长度枚举所有的随机串，设长度为$m$的随机串共有$a(m)$个，<u>因为所有这些随机串都是唯一可解的</u>，因此$a(m)\leq 2^m$。则$\sum\limits_{x^k\in \X^k}2^{-\ell(x^k)}=\sum\limits_{m=1}^{k\cdot \ell_\max}a(m)2^{-m}\leq$ $\sum\limits_{m=1}^{k\cdot \ell_\max}2^m2^{-m}=k\cdot \ell_\max$。于是我们得到了$\sum\limits_{i=1}^{n}2^{-\ell_i}\leq (k\cdot \ell_\max)^\frac{1}{k}$。这对于任何正整数$k$都成立，因此在$k\to+\infty$时也成立，而$\lim\limits_{k\to\infty}(k\ell_\max)^\frac{1}{k}=\lim\limits_{k\to\infty}k^\frac{1}{k}\cdot \lim\limits_{k\to\infty}\ell_\max^\frac{1}{k}=1\cdot 1=1$，证毕。

如果我们允许$\X$的大小是可数无穷的，那么我们的证明在最后一步就出错了，因为我们假设了$\ell_\max$是有限的。但是我们只需直接利用有限的结论与紧性，就能证明Kraft Inequality对于无限样本空间的随机变量也是依然成立的：假设$|\X|=\infty$，那么$\X$的每个有限子集$\X_n$都应当满足Kraft Inequality（紧性），那么取一列数列$a_n=\sum\limits_{x\in \X_n} 2^{-\ell_i}$，则$a_n\leq 1$恒成立。于是$\lim\limits_{n\to\infty}a_n=\sum\limits_{x\in \X} 2^{-\ell_i}\leq 1$也成立。

既然唯一可解码和前缀码一样也必须服从Kraft Inequality，所有能够成为唯一可解码的长度序列都可以作为前缀码的长度序列。由此可见把条件从前缀码放松到唯一可解码并没有给我们带来什么便利，或者我们说这两者差不多就是一回事。我们可以认为唯一可解码<u>几乎就是</u>指前缀码。

## 最优编码问题

在编码时，我们不仅要保证解码不能有歧义，还要使得编码的长度尽可能短。这里的长度指的是在统计词频后期望意义下的最短。例如在英文中e出现的概率最高，我们就希望e被编码得尽量短；q出现的概率低，我们就可以让q有相对较长的编码。设字母表的概率分布函数为$p$，第$i$个字符的出现概率为$p_i$，被编码长度为$\ell_i$。则我们要选取合适的$\ell_i$的分布，最小化$L=\sum\limits_{i=1}^{n}p_i\ell_i$。

由于$\ell_i$的分布必须满足Kraft Inequality，而一旦满足了Kraft Inequality就是一个可行的编码。因此这其实就是一个不等式约束下的凸优化问题：在约束$\sum\limits_{i=1}^{n}2^{-\ell_i}\leq 1$下最小化$L=\sum\limits_{i=1}^{n}p_i\ell_i$。对于这个问题，可以根据KKT条件直接求解。但方便起见我们先用Lagrange条件在等式取紧$\sum\limits_{i=1}^{n}2^{-\ell_i}=1$时求出$L$的最小值，再证明任何编码都不可能比这个最小值更小。

根据Lagrange乘数法，$L(\ell,\lambda)=\sum\limits_{i=1}^{n}p_i\ell_i+\lambda\left(\sum\limits_{i=1}^{n}2^{-\ell_i}-1\right)$。于是$\dfrac{\partial L}{\partial \ell_i}=p_i-\lambda\cdot 2^{-\ell_i}\ln 2=0$。因此$2^{-\ell_i}=\dfrac{p_i}{\lambda\ln 2}$是个定值。代入$\sum\limits_{i=1}^{n}2^{-\ell_i}=1$，得到$\dfrac{\sum p_i}{\lambda \ln 2}=1$，也即$\lambda = \dfrac{1}{\ln 2}$。由此解得$2^{-\ell_i}=p_i$，也就是说第$i$个字符应当被编码成长度为$\ell_i=\log_2 \dfrac{1}{p_i}$的串。这恰好是熵的定义中出现的项。如果我们重新写出期望的编码长度的式子，恰好得到$L=\sum\limits_{i=1}^{n}p_i\log_2\dfrac{1}{p_i}$。这就是$H(X)$的定义！我们还要进一步验证任何编码方式得到的$L$都不可能比$H(X)$更小。$L-H(X)=\sum\limits_{i=1}^{n}p_i\ell_i+\sum\limits_{i=1}^{n}p_i\log p_i$ $=\sum\limits_{i=1}^{n}p_i\log( p_i 2^{\ell_i})$。记$c=\sum\limits_{j=1}^{n}2^{-\ell_i}$，$r_i=\dfrac{2^{-\ell_i}}{c}$，则$r_i$构成了某个概率分布$q$。$L-H(X)=\sum\limits_{i=1}^{n}p_i\log \left(\dfrac{p_i}{2^{-\ell_i}}\cdot \dfrac{c}{c}\right)=\sum\limits_{i=1}^{n}p_i\log \left(\dfrac{p_i}{2^{-\ell_i}/c}\cdot \dfrac{1}{c}\right)$ $=\sum\limits_{i=1}^{n}p_i\log\dfrac{p_i}{r_i}-\log c$$=D(p||r)-\log c$。根据Kraft Inequality，$c\leq 1$，因此$-\log c\geq 0$。而根据信息不等式，相对熵$D(p||r)\geq 0$也成立。综上，$L\geq H(X)$始终成立。

所以我们看到，熵的含义就是最优编码的期望编码长度。当然，$\ell_i=-\log p_i$不一定是整数。这个等号只有在$X$的所有分布密度都是$2$的幂次时才能取到。一个自然的问题时，既然对于一般的分布等号总是无法取到，我们能否给出一个$L$的上界？（在AEP一节中我们已经给出$H(X)+\epsilon$作为上界，但当时并没有要求编成前缀码）下面我们证明，只需向上取整取$\ell_i=\left\lceil-\log p_i\right\rceil$就能得到上界$L\leq H(X)+1$。首先，将所有长度都变大一定仍然满足Kraft Inequality，因此这一定是一种合法的唯一可解码编码方式。（这种编码方式称为Shannon编码。）根据$-\log p_i \leq \ell_i \leq -\log p_i+1$，两边同时乘以$p_i$得到$-p_i\log p_i\leq p_i\ell_i\leq -\log p_i+p_i$。累加得到$\sum\limits_{i=1}^{n}-p_i\log p_i=$ $H(X)\leq$$\sum\limits_{i=1}^{n}p_i\ell_i=L$ $\leq \sum\limits_{i=1}^{n}-p_i\log p_i+\sum\limits_{i=1}^{n}p_i$$=H(X)+1$。

于是我们看到我们的理论给出的最优编码的bound $H(X)\leq L\leq H(X)+1$指出它最多只会比熵多1个bit。但进一步发现，如果连续给$n$个字符编码而考虑总的长度，那么$n$个随机变量可以看作合并看作单个随机变量，上述分析依然成立。那么$H(X_1,\cdots,X_n)\leq L_n \leq H(X_1,\cdots,X_n)+1$，而$X_i$是i.i.d.的，因此得到$nH(X)\leq L_n \leq nH(X)+1$，于是平均意义下单个字符的编码长度满足$H(X)\leq \dfrac{L_n}{n} \leq H(X)+\dfrac{1}{n}$，在$n\to \infty$时$\dfrac{1}{n}\to 0$，上下界都夹逼到了同一极限$H(X)$。如果$X_i$不是i.i.d.的而是一个随机过程，那么$\dfrac{H(X_1,\cdots,X_n)}{n}\leq \dfrac{L_n}{n}\leq\dfrac{H(X_1,\cdots,X_n)}{n}+\dfrac{1}{n}$，当$n\to\infty$时，平均编码长度收敛于熵率$\lim\limits_{n\to\infty}\dfrac{H(X_1,\cdots,X_n)}{n}=H(\X)$。由此我们看到了熵和熵率的重要意义：熵描述单个随机变量做最优编码所需要的期望位数；熵率描述给随机过程做最优编码时<u>平均每个随机变量</u>所需要的期望位数。

根据最优编码，我们还可以给出相对熵$D(p||q)$的直观意义。如果随机变量$X$的分布为$p(x)$，却被按照分布$q(x)$来编码得到$\ell_i=\left\lceil-\log q_i\right\rceil$，此时编码长度$\E[\ell(X)]=\sum\limits_{x\in\X}p(x)\left\lceil-\log q_i\right\rceil<$ $\sum\limits_{x\in\X}p(x)(-\log q_i+1)$$=\sum\limits_{x\in\X}p(x)\log \left(\dfrac{p_i}{q_i}\cdot \dfrac{1}{p_i}\right)+\sum\limits_{x\in\X}p(x)$ $=\sum\limits_{x\in\X}p(x)\log \dfrac{p_i}{q_i}+\sum\limits_{x\in\X}p(x)\log\dfrac{1}{p_i}+1$$=D(p||q)+H(X)+1$。可见如果我们按照一个错误的分布$q$来编码分布为$p$的随机变量，平均长度会增长一个误差$D(p||q)$。这正是我们之前所说的相对熵描述两个分布之间熵的“相对距离”的一个具体体现。

## 哈夫曼编码(Huffman Code)

我们已经能够构造满足Kraft Inequality的编码了，但这不一定是最优编码。Shannon编码$\ell_i=\left\lceil-\log p_i\right\rceil$满足$L\leq H(X)+1$，但也不一定是最优的。现在我们要来实际构造一个唯一可解的最优编码，称为“哈夫曼编码”，并证明任何其它编码方式都不可能在期望长度上做到比它更优。

我们在前缀树上思考这个问题。我们现在要构造一棵$n$个叶节点的二叉树，期望编码长度就等于每个叶节点的权值(概率)乘以该叶节点的深度求和，我们要让这个和尽量小。这样一棵二叉树有什么性质呢？首先我们观察到，深度最大的节点一定不止一个，不然我们可以删除这个节点用它的父节点代替它，结果一定会更优。同时，深度最大的节点的兄弟节点必然存在，不然我们也可以删掉它用父节点顶替。我们还发现，深度更大的叶节点的概率权值一定更小，因为如果存在一对违反这一性质的节点，仅仅通过交换这两个叶节点的权值我们就能让总和更小了。既然这样，那么我们总是能让概率最小的那个叶节点的兄弟是概率第二小的，如果不是，我们可以把它的兄弟节点和概率第二小的交换一下而不影响结果，因为概率第二小的一定和第一小的有相同的深度。

现在我们归纳地构造哈夫曼编码。如果样本空间为2，那么直接编码为0和1即可，我们有了最简单的一棵二叉树。现在假设我们已经能够构造样本空间为$m-1$的哈夫曼编码了，那么对于概率分布$p=(p_1,p_2,\cdots,p_m)$，不失一般性假设$p_1\geq p_2\geq \cdots \geq p_m$。现在把概率最小的两个$p_{m-1}$与$p_m$合并为$p_{m-1}+p_m$，得到了一个$m-1$元的分布$p'=(p_1,p_2,\cdots,p_{m-1}+p_m)$（并不保证按顺序排列），构造这个分布的哈夫曼树，并在$p_{m-1}+p_m$对应的叶节点下增添两个儿子，分别对应$p_m$和$p_{m-1}$对应的叶节点，我们证明这样我们就得到了$m$元的哈夫曼树了！在增添了这两个叶节点后，总和增大了$p_{m-1}+p_m$。设$m-1$元时哈夫曼编码的总和为$L_0$，那么现在的总和为$L_0+p_{m-1}+p_m$。假设现在的不是最优编码，那么最优编码长度$L'$满足$L'<L_0+p_{m-1}+p_m$，它对应的哈夫曼树上$p_{m}$与$p_{m-1}$恰好是深度最深的并且互为兄弟节点，只需把它们删除而用它们的父亲以权值$p_m+p_{m-1}$顶替，我们就得到了一棵总和为$L'-p_{m-1}-p_m$的$m-1$元哈夫曼树，而$L'-p_{m-1}-p_m<L_0$，矛盾。综上，我们的构造一定是最优的。

构造哈夫曼编码的算法本质上是贪心算法，因为我们直观上就想让概率小的有较长的编码，概率大的有较短的编码：我们每次选择概率最小的两个，将它们合并（也即令它们在二叉树上互为兄弟），然后以这两个节点合并的身份继续在剩下的$n-1$个里面选最小的两个，这样我们就得到了一棵二叉树，这就是哈夫曼树。

需要指出，这个算法对于任何$D$进制编码都是成立的。当$D>2$时，我们每次选出最小的$D$个合并构造$D$叉树，并能证明这就是最优编码。（一个要注意的细节是，我们要求哈夫曼树的每个节点的儿子个数都是满的。因此总的待编码的样本大小必须是$1+(D-1)\cdot k$，如果样本大小恰好不满足这个形式，我们可以加入一些概率为0的样本，让它们获得最长的编码而不是让那些概率不为0的样本被编码成更长的。）

## Shannon–Fano–Elias编码

哈夫曼编码是需要依据概率分布的排序的，在编码过程中我们需要一个支持给出最小值和合并（插入、删除）的数据结构，这样的数据结构（堆、平衡树等）是$O(n\log n)$的。下面我们给出一种基于累积分布函数的编码方式，称为Shannon–Fano–Elias编码，由于累积分布函数的计算是$O(n)$的，我们能够在线性时间内完成编码。

不失一般性，设样本空间为$\X=\{1,\cdots,n\}$。于是有累积分布函数$F(x)=\sum\limits_{i\leq x}p(i)$。由于在所有样本点$i$上$F$的值都互不相同，且这个值一定是一个$[0,1]$间的小数，我们可以用这个小数来做编码。但由于这个小数可能是无限的，我们必须对其进行truncate。假设我们规定了第$i$个样本的编码长度$\ell_i$，那么我们就截取$F(i)$二进制小数点后的前$\ell_i$位作为我们的编码。在这里，我们就取类似Shannon编码中的$\ell_i=\left\lceil-\log p_i\right\rceil+1$（显然符合Kraft Inequality）。我们要保证我们的编码是前缀码，为此我们要用$[0,1]$上小数区间覆盖的方式证明所有编码对应的区间是互不重叠的。对于样本点$i$，由于它被截断到$\ell_i$位，它会占据长度位$2^{-\ell_i}$的区间。而$2^{-\ell_i}=2^{-(\left\lceil-\log p_i\right\rceil+1)}$ $\leq\dfrac{2^{\log p_i}}{2}=\dfrac{p(i)}{2}$。为了使区间互不重叠，我们需要做一些调整，在$F$的每个样本点$i$处减掉$p(i)$的一半，对新的函数$\bar F(x)=\dfrac{p(x)}{2}+\sum\limits_{i<x}p(i)$进行上述编码。这样得到的所有区间确实是互不重叠的了。这就是Shannon–Fano–Elias编码。

Shannon–Fano–Elias编码的期望长度$L=\sum\limits_{i=1}^{n}p_i(\left\lceil-\log p_i\right\rceil+1)$ $=1+\sum\limits_{i=1}^{n}p_i\left\lceil-\log p_i\right\rceil$，而$\sum\limits_{i=1}^{n}p_i\left\lceil-\log p_i\right\rceil$就是Shannon编码的期望长度，我们证明过它有上界$H(X)+1$。因此Shannon–Fano–Elias编码的期望长度有上界$H(X)+2$。

## Competitive Optimality

到目前位置，当我们讨论编码的最优性时，我们讨论的是编码的期望意义下的长度。现在我们想要从别的角度来看这个问题。一种比较编码最优性的方式称为竞争最优性(Competitive Optimality)，每次我们随机从样本空间中抽取一个样本，然后分别用两种方式编码，编码较短的一方获胜。通过获胜的概率来衡量编码的优劣。与哈夫曼编码相比，Shannon编码或Shannon–Fano–Elias编码的一个优势在于它对于编码长度有显式的表达式$\ell_i=\left\lceil-\log p_i\right\rceil$或$\ell_i=\left\lceil-\log p_i\right\rceil+1$，这对于我们分析算法的最优性提供了很大的数学上的便利。接下来我们就讨论Shannon编码的竞争最优性。

设对于字符$x$，Shannon编码的长度为$l(x)$。我们任意选定另一种唯一可解的编码方式，记它对$x$的编码长度为$l'(x)$。下面我们来计算Shannon编码战败的概率，更精确的，计算Shannon编码比给定编码方式长$c$位的概率$\Pr[l(X)\geq l'(X)+c]$，其中$c$是正整数。代入$l(X)=\left\lceil\log \dfrac{1}{p(X)}\right\rceil$，由于$l(X)\leq\log \dfrac{1}{p(X)}+1$，$\Pr[l(X)\geq l'(X)+c]$ $\leq \Pr\left[\log \dfrac{1}{p(X)}\geq l'(X)+c-1\right]$$=\Pr\left[\dfrac{1}{p(X)}\geq 2^{l'(X)+c-1}\right]$ $=\sum\limits_{p(x)\leq 2^{-(l'(x)+c-1)}}p(x)\leq$$\sum\limits_{p(x)\leq 2^{-(l'(x)+c-1)}}2^{-(l'(x)+c-1)}$ $\leq \sum\limits_{x\in\X}2^{-(l'(x)+c-1)}=\dfrac{1}{2^{c-1}}\sum\limits_{x\in\X}2^{-l'(x)}$。而$l'(x)$满足Kraft Inequality，因此$\dfrac{1}{2^{c-1}}\sum\limits_{x\in\X}2^{-l'(x)}\leq \dfrac{1}{2^{c-1}}$。综上，我们得到$\Pr[l(X)\geq l'(X)+c]\leq \dfrac{1}{2^{c-1}}$。可见Shannon编码比其它编码在单个字符上长2位的概率小于$1/2$，长3位的概率小于$1/4$……别的编码方式只有很小概率能战胜Shannon编码。

上述不等式在$c=1$时并没有良好的刻画。我们想进一步讨论$\Pr[l(X)>l'(X)]$。为此，我们假设$l(X)$都是2的幂次（也即$l(x)=-\log p(x)$），来证明$\Pr[l(X)>l'(X)]\leq\dfrac{1}{2}$。这等价于证明$\Pr[l(X)<l'(X)]\geq\Pr[l(X)>l'(X)]$。$\Pr[l(X)>l'(X)]-\Pr[l(X)<l'(X)]$ $=\sum\limits_{x:l(x)>l'(x)}p(x)-\sum\limits_{x:l(x)<l'(x)}p(x)$$=\sum\limits_{x}p(x)\text{sgn}(l(x)-l'(x))$。由于当$t\in \N$时总是成立$\text{sgn}(t)\leq 2^t-1$，$\sum\limits_{x}p(x)\text{sgn}(l(x)-l'(x))\leq \sum\limits_{x}p(x)(2^{l(x)-l'(x)}-1)=$ $\sum\limits_{x}2^{-l(x)}(2^{l(x)-l'(x)}-1)$$=\sum\limits_{x}2^{-l'(x)}-\sum\limits_{x}2^{-l(x)}$ $=\sum\limits_{x}2^{-l'(x)}-\sum\limits_{x}p(x)=\sum\limits_{x}2^{-l'(x)}-1$，根据Kraft Inequality，$\sum\limits_{x}2^{-l'(x)}-1\leq 0$。综上，$\Pr[l(X)>l'(X)]-\Pr[l(X)<l'(X)]\leq 0$。特别地，我们来观察取等条件。这要求$l(x)-l'(x)$只能等于0或1，也即$l'$比$l$在每一个字符都要更短，并且最后的Kraft Inequality取紧，而$l$也要满足Kraft Inequality，说明只能$l(x)=l'(x)$处处成立。

在我们的证明中，依赖于$l(X)$都是2的幂次得到了一个简洁的结论。如果这个条件不满足，我们需要在$p(x)$的放缩中加一个1，最终用类似的方法证明$\sum\limits_{x}p(x)\text{sgn}(l(x)-l'(x)-1)\leq 0$。在上述过程中，我们选择了$2^t-1$这个函数来放缩$\text{sgn}(t)$。选取任意别的更小的函数$f$都可以完成证明，也即$\E[f(l(x)-l'(x)-1)]\leq 0$。

## 随机变量的生成

假如我们已经知道了一个概率分布，怎么根据这个分布来生成一个随机变量呢？抛硬币是最简单的生成随机变量的方法，只需进行一次抛硬币的动作我们就能得到一个0-1的二项分布的结果。能不能通过多次抛硬币，来得到一个复杂的概率分布的随机变量呢？如果要做到这样，我们就要把每个抛硬币的结果序列对应到随机变量的一个取值上，每个长度为$k$的结果序列都对应着概率$2^{-k}$。我们可以进行一些适当的拼凑，使得这些概率之和恰好凑成了对应的概率密度，这样我们就最终实现了用抛硬币来生成任意随机变量的目标。

在如上的生成随机变量的过程中，我们当然关心能否让期望的抛硬币的次数尽量小。我们将发现，这再次与随机变量的熵联系在了一起。假如我们要生成的随机变量的概率分布的每个密度本身就都是2的幂次，那么我们直接用这个分布对应的哈夫曼树就得到了一个二进制序列与分布的一一对应。容易发现，此时抛硬币次数的期望就是该随机变量哈夫曼编码的期望长度，也就是熵。假如概率分布不是2的幂次呢？如果继续采用哈夫曼编码，我们就要把每个概率密度按照二进制小数的方式拆分成细小的2的幂次的分布之和（这可能是无穷的，因为存在无限小数）。下面我们证明，用这些拆分后的2的幂次直接生成哈夫曼树来生成随机变量，期望的抛硬币次数在$H(X)$与$H(X)+2$之间。

设$X$的概率密度$p(i)$拆成二进制小数以后写作$0.p(i)^{(1)}p(i)^{(2)}\cdots p(i)^{(n)}\cdots$，也即$p(i)=\sum\limits_{j:p(i)^{(j)}>0}2^{-j}$。设所有的拆分后的概率组成一个新的更细小的分布$Y$，$Y$对应的哈夫曼树的期望深度就是期望的抛硬币次数。所以我们就是要bound $H(Y)$。容易看到$X$是$Y$的函数，因此$H(X)\leq H(Y)$。而$H(Y)=-\sum\limits_{i=1}^{n}\sum\limits_{j:p(i)^{(j)}>0}2^{-j}\log(2^{-j})$ $=\sum\limits_{i=1}^{n}\sum\limits_{j:p(i)^{(j)}>0}j\cdot 2^{-j}$。对于$p(i)$，假设它在小数部分恰好有$n_i$个前导0，那么$2^{-n_i+1}> p(i)\geq 2^{-n_i}$，那么令$T_i=\sum\limits_{j:p(i)^{(j)}>0}j\cdot 2^{-j}=\sum\limits_{j\geq n:p(i)^{(j)}>0}j\cdot 2^{-j}$。要证$H(Y)=\sum\limits_{i=1}^{n}T_i\leq H(X)+2=\sum\limits_{i=1}^{n}p(i)(-\log p(i)+2)$，只需证$\forall i,T_i<-p(i)\log p(i)+2p(i)$：根据$\log p(i)\leq -n_i+1$，有$T_i+p(i)\log p(i)-2p(i)$ $\leq T_i-(n_i+1)p(i)$$=\sum\limits_{j\geq n:p(i)^{(j)}>0}j\cdot 2^{-j}-(n+1)\sum\limits_{j\geq n:p(i)^{(j)}>0}2^{-j}$ $=\sum\limits_{j\geq n:p(i)^{(j)}>0}(j-n-1)\cdot 2^{-j}$，单独取出$j=n$与$j=n+1$两项，得到$-2^{-n}+\sum\limits_{j\geq n+2:p(i)^{(j)}>0}(j-n-1)\cdot 2^{-j}$，换元令$k=j-n-1$得$-2^{-n}+\sum\limits_{k\geq 1:p(i)^{(k+n+1)}>0}k\cdot 2^{-k-n-1}$ $\leq -2^{-n}+2^{-n-1}\sum\limits_{k\geq 1}k\cdot 2^{-k}=-2^{-n}+2^{-n-1}\cdot 2=0$。得证。











