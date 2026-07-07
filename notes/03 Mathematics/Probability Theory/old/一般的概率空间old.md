在离散概率中，我们总是默认样本集$\Omega$是有限集。现在我们考虑一般的情况，假设$\Omega$可能是无穷集，甚至是不可数无穷集。

我们首先注意到，对于样本集无穷的情况，有的时候我们不再能讨论“基本事件”了。例如，我们能否回答“在整个自然数集$\N$上均匀随机地选择一个自然数，选到自然数$42$的概率是多少”？依照原来的方式，我们会令$\Omega=\N$，令每个自然数构成一个基本事件。因为要求均匀随机，所以每个基本事件的概率必须相等，那么$P(\Omega)=1=\sum\limits_{i \geq 0}P(i)$。既然$P(i)$全部相等，那么对其求和要么是0要么是无穷大，矛盾！我们找不到这样的函数$P$满足我们的要求。同样的道理，我们也无法定义“在实数区间$[0,1]$上均匀随机地选择一个实数，取到$1/2$的概率是多少？”所以，面对无穷的样本集，我们不再能把事件集简单地定义为样本集的幂集。比如，当样本集为$[0,1]$区间，假设我们定义事件集为$2^{[0,1]}$，那么这就会允许每个实数$x\in [0,1]$对应一个事件$\{x\}$，而我们很难为$\{x\}$分配满足要求的概率$P(x)$。

下面我们严格地证明，不存在一个概率空间能够刻画“在$\R$上（或在$[0,1]$上）均匀随机选择一个实数”。

不失一般性，设$\Omega=[0,1)$。对于任意一个实数$x\in \Omega$，我们选出所有与它差值为有理数的数放入同一个集合（等价类），这样$[0,1)$就被分划为了许多等价类，不同等价类中的任意两个元素间隔都是无理数。现在我们从每个等价类里任意挑选一个元素出来，构成集合$N$（根据选择公理，这个集合存在）。对于$r \in \Q \cap [0,1]$，定义$N_r=\{(x+r) \mod 1 \mid x \in N\}$，它是$N$“平移”$r$之后的集合。我们发现任意整数$z$都存在且只存在于某一个$N_r$中，因为首先所有的等价类覆盖住了$[0,1)$，一定存在一个有理数使得$z$平移那么多距离就落在了选进$N$的那个点上，其次如果$z$同时存在于两个$N_r$中，这两个$N_r$之间就有元素差值为有理数，这意味着$N$中存在两个数差值为有理数，这是不可能的。于是$N_r$可以被看作$[0,1)$的分划了。这样就有$P([0,1))=\sum\limits_{r}P(N_r)$，不同的$P(N_r)$间没有理由有所差别，而$r$又有无穷多个，矛盾。因此这样的概率空间是不存在的。

## Kolmogorov公理

$\newcommand{\F}{\mathcal{F}}$Kolmogorov建立了一般概率空间的公理系统，这套系统是建立在测度论语言之上的，详见[测度论01 测度](https://www.cnblogs.com/qixingzhi/p/18758202)。在这套系统中，我们引入$\sigma$-algebra来定义事件集：对于样本集为$\Omega$，其事件集$\F$是$\Omega$上的一个$\sigma$-algebra。也即：

- $\varnothing \in \mathcal{F}$，$\Omega \in \F$；
- $A \in \mathcal{F} \Rightarrow \Omega\setminus A \in \mathcal{F}$；
- 至多可数个$A_1,A_2 \cdots  \in \mathcal{F} \Rightarrow \bigcup\limits_{i \geq 1} A_i \in \mathcal{F}$；

上面的最后一条性质尤为重要。我们可以把$\sigma$-algebra看作是我们对“事件”这一对象所具有的数学性质的抽象，那么包含某个样本集幂集的子集的$\sigma$-algebra就是容许我们在这个子集上<u>讨论概率事件</u>的最小舞台。例如，尽管“在$[0,1]$区间内均匀随机选取一个实数，选中$1/2$的概率是多少”的问题是没有意义的，但我们可以还是经常需要在$[0,1]$的样本集上讨论概率事件，诸如“在$[0,1]$区间内均匀随机选取一个实数，选中的数的期望是多少？”或者“在$[0,1]$上均匀随机选取两个点，这两个点连成的线段长度的期望是多少？”的问题是有意义的。只不过，为了回答这样的问题我们不必建立$2^{[0,1]}$这么完整的事件集，而只需要它的一个子集。当取某个恰当的子集时，我们可以定义合适的概率测度，这时我们就可以回答这些概率问题了。

### Borel Set

$\newcommand{\B}{\mathcal{B}}$样本集$[0,1]$上常用的一个事件集是$\mathcal{B}([0,1])$，称为$[0,1]$上的Borel Set。Borel Set的定义如下：对于一个实数区间$I$，Borel Set $\B( I)$是$I$上所有的开区间<u>生成</u>的$\sigma$-algebra。根据定义，我们可以发现$\B([0,1])$里包含：所有开区间，比如$(1/3,1/2)$；开区间的并，比如$(1/10,1/9)\cup (1/2,2/3)\cup (97/99,98/99)$；所有闭区间，比如$[1/3,1/2]$（这是因为一个无穷开区间列$(a_i,b_i)$的并必须被包含在内，当$\lim\limits_{n\to\infty}a_n=1/3,\lim\limits_{n\to\infty}b_n=1/2$时，$\bigcup\limits_{i\geq 1}(a_i,b_i)=[1/3,1/2]$）；开区间的并；半开半闭区间；半开半闭区间的并……

我们可以更一般的，考虑实数集$\R$的Borel Set $\B(\R)$（所有实数开区间生成的$\sigma$-algebra）。此时里面还应当包括$(\infty,3)$，$[5,+\infty)$等等包含无穷的区间。事实上，可以证明Borel Set也可以等价的定义成“由所有实数闭区间生成的$\sigma$-algebra”，或者“由所有区间$(a,+\infty)$生成的$\sigma$-algebra”等等。因为在可数并或可数交的意义下，开区间、闭区间、无穷区间其实是等效的。这本质上是由于$\sigma$-algebra的生成方式中包含了“补集”和“可数并”这两种操作。其中，把$\B(\R)$看作所有区间$(-\infty,a]$生成的$\sigma$-algebra这个看法在我们之后的讨论中很有用。

> 对于$\R^n$也可以定义Borel Set，例如$\B(\R^2)$定义为所有闭矩形生成的$\sigma$-algebra。

### $\sigma$-algebra上的概率测度

对于$\sigma$-algebra $(\Omega,\mathcal{F})$，定义概率测度$P:\mathcal{F} \to \R$满足三个条件：
①$\forall A \in \mathcal{F},P(A) \geq 0$；
②$P(\Omega)=1$；
③对于至多可数个互不相交的事件序列$A_1,A_2,\cdots$，$P(\bigcup\limits_{i\geq 1} A_i)=\sum\limits_{i\geq 1} P(A_i)$。

由此可见，如果$A \subseteq B$，那么$P(B)=P(A)+P(B\setminus A)\geq P(A)$。把它拓展为无穷情形下，如果$A_1 \subseteq A_2 \subseteq A_3 \cdots$，那么$P(A_1) \leq P(A_2) \leq P(A_3)\leq \cdots$。所以$P(A_i)$构成一个单调数列，并且有上界$1$。那么根据单调有界收敛定理，极限$\lim\limits_{n \to \infty}P(A_n)$存在。同时$\lim\limits_{n\to\infty}P(\bigcup\limits_{i=1}^{n}A_i)=P(\bigcup\limits_{i=1}^{\infty}A_i)$$=P(A_1)+\sum\limits_{i=2}^{\infty}P(A_i \backslash A_{i-1})$$=P(A_1)+$$\lim\limits_{n\to\infty}\sum\limits_{i=2}^{n}[P(A_i)-P(A_{i-1})]$$=\lim\limits_{n\to\infty}P(A_n)$，因此$\lim\limits_{n\to\infty}P(A_n)=P(\lim\limits_{n\to\infty}\bigcup\limits_{i=1}^{n}A_i)$，这称为概率测度的连续性（在分析学中“连续”就是指极限符号可交换）。

以下在离散情形下满足的概率公式在新的概率测度的定义下依然满足（因为新的概率测度的定义和原来并没有本质区别）：全概率公式，假如$A_i$是$\Omega$的一个分划，则$\forall B \in \mathcal{F}$，$P(B)=\sum\limits_{i}P(B \cap A_i)$；Union Bound，$P(A\cup B)\le P(A)+P(B)$，推广到可数并$P(\bigcup\limits_{i\in I}A_i)\le \sum\limits_{i\in I}P(A_i)$；概率意义下的容斥原理$P(\bigcup\limits_{i=1}^n A_i)=\sum\limits_{\varnothing\neq J\subseteq [n]}(-1)^{|J|+1}P(\bigcap\limits_{j\in J}A_j)$。

同样，我们引入条件概率的定义$P(A\mid B)=\dfrac{P(A \cap B)}{P(B)}$。条件概率满足以下链式法则：$P(\bigcap\limits_{i\in [n]}A_i)=\prod\limits_{i=1}^n P(A_i\mid \bigcap\limits_{j=1}^{i-1}A_j)$。

再一次，我们引入独立的概念，定义两个事件是独立的当且仅当$P(A \cap B)=P(A) \cdot P(B)$。称一列事件两两独立，若$\forall i,j\in [n],i\neq j,A_i\bot A_j$；称一列事件互相独立，若$\forall I\subseteq [n],P(\bigcap\limits_{i\in I}A_i)=\prod\limits_{i\in I}P(A_i)$。对于一个无穷集，定义它是互相独立的当且仅当它的任意有限子集都是互相独立的。

最终，我们称三元组$(\Omega,\mathcal{F},P)$为一个概率空间。

## $\R$上均匀随机选择一个实数



？？？

正是因为$[0,1]$上均匀选取一个点这样的概率空间不存在，我们才发展了Borel Set这一工具，把概率空间定义为$([0,1],B([0,1]),P)$，那么如何选取$P$呢？根据直观，概率测度应当满足$P([a,b])=P((a,b))$$=P([a,b))=P((a,b])=b-a$。我们可以证明（根据测度扩展定理，但证明很复杂，略）这样的测度是存在的，这称为<u>勒贝格测度</u>(Lebesgue Measure)。这样我们就完善地定义了一个样本集为$\R$（或等价的，$[0,1]$区间）的概率空间。















