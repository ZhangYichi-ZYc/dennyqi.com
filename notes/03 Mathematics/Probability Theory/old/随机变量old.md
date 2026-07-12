## 可测函数$\newcommand{\F}{\mathcal{F}}\newcommand{\B}{\mathcal{B}}\newcommand{\Var}{\text{Var}}\newcommand{\E}{\mathbb{E}}$

下面我们要讨论一个称为“随机变量”的概念，它是样本集到实数的函数$X:\Omega \to \R$。通常来说，我们只需对于每个$\omega\in \Omega$赋予一个实数值，就得到了这样的一个函数。但现在我们必须指出，并不是所有$\Omega\to\R$的映射都能被称为一个“随机变量”。随机变量的特殊性在于我们通常需要通过它来描述事件。例如取样本空间为$[6]\times [6]$，表示连续投两次骰子。那么现在假设两次投出的点数之和确实是一个随机变量（它的确是样本空间到实数的映射），那么我们通常会这样讨论它：点数之和大于8的概率是多少？“点数之和大于8”对应的是$\Omega$中的一个子集，在离散情形下这是完全合理的，因为我们总把$2^\Omega$和事件集$\F$等同起来。而这件事在一般情形下并不总是合理的，因为当我们讨论$\Omega$的一个子集时，它不一定落在$\F$里。我们必须规定当我们描述随机变量的某一性质时，它指向的样本集合必须落在事件集里。其中，“描述随机变量的某一性质”本质上是选定$\R$上的一个子集$A \subseteq \R$讨论$\{\omega \mid X(\omega)\in A\}$，我们把<u>这个集合</u>简记为$X \in A$。我们要讨论这一性质的“概率”，首先必须满足$X \in A$是一个事件！这意味着$X \in A$必须落在$\F$中，只有这样$X$才能称之为随机变量。这称为随机变量必须满足“可测性”，随机变量必须是$(\Omega,\mathcal{F})$上的“可测函数”。而与我们引入$\sigma$-algebra作为事件集的动机类似，想让$X$在所有$A \subseteq \R$都可测是做不到的，因此我们只要求$A\subseteq \B(\R)$。

下面我们要把以上直观严格地转化为数学定义：称$f$是$(\Omega,\F)$上的可测函数，当且仅当$\forall A \in \B(\R)$，$\{\omega\mid f(\omega)\in A\} \in \mathcal{F}$。称$X:\Omega \to \R$是随机变量当且仅当它是$(\Omega,\F)$上的一个可测函数。

我们之所以要如此强调可测性，是因为在连续空间上样本集的幂集（比如$\R$的幂集）可能是不可测的。换言之我们无法在$\R$的幂集上定义一个测度（幂集到实数的映射），使得概率测度的三条公理同时成立。而正是由于对于$\B(\R)$，这样的测度是存在的（勒贝格测度），我们才把$\R$上的事件集定义为$\B(\R)$。一个随机变量是可测的，意味着当我们用Borel Set来描述它的行为时，我们总是能够给出这一行为发生的概率的。另一方面，一旦我们得到了一个随机变量$X$，我们马上就能给出一个由$X$给出的$\B(\R)$的测度$\mu(A)=P(X \in A)$，因此对于任意$A \in \B(\R)$，$X\in A$都落在$\F$中，而每个$\F$中的事件都有对应的概率测度$P$。可见$\B(\R)$上的测度远不止勒贝格测度一个，每个随机变量都能给出一个对应的测度。

## 累积分布函数(Cumulative Distribution Function, CDF)

利用定义来验证一个函数是否是随机变量（可测函数）是困难的。我们指出下面这一事实：$X$是随机变量当且仅当$\forall a\in \R$集合$\{\omega \mid X(\omega) \leq a\} \in \mathcal{F}$恒成立。也就是说其实我们不必验证Borel Set中的每个元素，而只需验证所有形如$(-\infty,a]$的区间。这并不令人惊讶，因为我们知道Borel Set本身就可以由$(-\infty,a]$生成，所以此处证明省略。

由此可见，一个随机变量在所有$(-\infty,a]$上都是可测的，换言之所有$P(X \leq a)$都是存在的。于是我们定义“累积分布函数”：$F_X(a)=P(X \leq a)$。根据定义可以验证如下性质：累积分布函数的值域是$[0,1]$，并且是单调函数，它在负无穷处极限为0，正无穷处极限为1。累积分布函数不一定是连续的，以骰子为例我们就得到一个分段的函数。但我们证明累积分布函数一定是右连续的：这种不对称性正是来自我们在定义随机变量时区间是右闭的。由此也可见累积分布函数上任意一点的左极限都存在，只是不一定等于右极限（也即，累积分布函数的间断点都是第一类间断点）。另外，单调函数的间断点一定只有可数个，因此累积分布函数的间断点也一定只有可数个。

所以容易发现$P(X = a)$应当等于$P(X \leq a)-P(X < a)=F_X(a)-\lim\limits_{k \to a}F_X(k)$，也即随机变量等于某个值的概率等于CDF上该点的值减去其左极限：$P(X=a)=F_X(a)-F_X(a^-)$。对于$\R$，开区间和闭区间的勒贝格测度总是相等的，因此$P(X=a)$总为0。在离散情形时，随机变量取某个值的概率可能不为0时，此时累积分布函数一定间断。

最后我们指出，如果一个函数满足①值域属于$[0,1]$；②单调递增；③负无穷处极限为0，正无穷处极限为1；④处处右连续；那么一定存在一个由它作为累积分布函数确定的随机变量。

## 随机变量的独立性

我们根据事件的独立性，可以定义随机变量的独立性。如果随机变量$X,Y$满足$\forall x,y \in \R$，$P(X \leq x \land  Y \leq y)=P(X \leq x)\cdot P(Y \leq y)$，就称随机变量$X,Y$独立。这个定义看似只对所有形如$(-\infty,a]$的区间定义，实际上它与“$\forall A,B \in \B(\R)$，$P(X \in A \land Y \in B)=P(X \in A)P(Y \in B)$”是等价的。这同样是源于$(-\infty,a]$与Borel Set的等价性，证明略。

在上面的定义中，$X \in A$和$Y \in B$本身就是事件，由此可见随机变量的独立性的定义是建立在概率空间里事件的独立性之上的，所以事件的pairwise independent, mutually independent都可以直接沿用到随机变量上，定义随机变量的pairwise independent和mutually independent，此处不再赘述。

## 离散分布的随机变量

一个随机变量是离散分布的，当且仅当存在可数个点$x_1,x_2,\cdots,x_n,\cdots \in \R$，使得$\sum\limits_{i=1}^{\infty}P(x_i)=1$。称$p(x)=P(X=x_i)$为$X$在$x$处的概率质量，$p$为概率质量函数(Probability Mass Function, PMF)。注意这并不意味着随机变量只能在可数个点上取值，它可以在许多点上取0，而只要满足在可数个点上构成全部的概率分布。

> 与离散相对的是连续分布的随机变量。一个随机变量是连续分布的当且仅当它是由一个连续的累积分布函数给出的。我们已经看到，如果随机变量是离散分布的那么累积分布函数必然会在离散的点上出现间断。因此如果累积分布函数连续，随机变量就不是离散分布的。关于连续分布将在之后再做讨论。

下面定义离散分布的随机变量的期望。由于随机变量只在可数个点上有非零的概率分布，因此我们可以根据随机变量的<u>取值</u>对样本空间$\Omega$作分划：$\Lambda_0,\Lambda_1,\cdots$。其中，$\Lambda_1=\{\omega \mid X(\omega)=x_1\}$，$\Lambda_2=\{\omega \mid X(\omega)=x_2\}$，$\cdots$并且还有零测集$P(\Lambda_0)=0$。我们定义$X$的期望为$\E[X]=\sum\limits_{i \geq 1}x_iP(\Lambda_i)$，<u>如果满足$\sum\limits_{i \geq 1}|x_i|P(\Lambda_i)<\infty$</u>。后面的这个条件称为随机变量$X$是“可积”的。换言之，只有当随机变量的取值乘以概率这一“级数”<u>绝对收敛</u>时，我们才能定义期望。这是由于绝对收敛能够保证级数的加法交换律，仅仅满足条件收敛的级数根据Riemann的更序级数定律，级数的值将与作加法的顺序有关最终取遍所有实数，而显然期望是不应该依赖于加法的顺序的。

如果$X$是随机变量，那么它是$\Omega \to \R$的映射。那么对于一个一元函数$f$（$\R \to \R$的映射），与随机变量这一映射复合以后$f(X)$也就成为一个随机变量。我们对$X$的取值做的分划在$f(X)$上依然适用，因此容易得到这个函数的随机变量的期望$\E[f(X)]=\sum\limits_{i \geq 1}f(x_i)P(\Lambda_i)$。当然前提是$f(X)$确实是一个随机变量（可测）并且是可积的。

如果随机变量的取值都为正整数，那么由于期望$\E[X]=\sum\limits_{i \geq 1}iP(X=i)$，它也可以等价地写作$\E[X]=\sum\limits_{i \geq 1}P(X \geq i)$。

### 期望的线性性

最重要的一个性质称为期望的线性性：如果随机变量$X,Y$是可积的，那么$aX+bY$这一随机变量也是可积的，并且满足$\E[aX+bY]=a\E[X]+b\E[Y]$。首先验证可积性：对$|aX+bY|$的取值作分划$\Lambda_i$，于是$\E[|aX+bY|]=\sum\limits_{i \geq 1}|ax_i+by_i|P(\Lambda_i) \leq a\sum\limits_{i\geq 1}|x_i|P(\Lambda_i)+b\sum\limits_{i\geq 1}|y_i|P(\Lambda_i)$，由于$X,Y$都是可积的因此右边的式子收敛，可积性得证。对$aX+bY$作分划$\Lambda'_i$，得$\E[aX+bY]=\sum\limits_{i \geq 1}(ax_i+by_i)P(\Lambda_i')=a\sum\limits_{i \geq 1}x_iP(\Lambda_i')+b\sum\limits_{i \geq 1}y_iP(\Lambda_i')=a\E[X]+b\E[Y]$。特别强调，期望的线性性是期望这一运算本身的一种性质，与随机变量的性质无关。$X,Y$即使不是独立的随机变量，线性性也依然满足。如果$X,Y$是独立的，我们根据定义容易进一步验证$\E[XY]=\E[X]\E[Y]$。

### 方差，$k$-阶矩

另一个常用的概念是方差(Variance)，它定义为$\Var(X)=\E[(X-E[X])^2]$。我们知道最小二乘法中我们就是用差的平方来衡量拟合的好差。类似地，方差恰好也用平方和的形式来衡量随机变量的波动情况。利用期望的线性性，我们可以得到$V(X)=\E[X^2+\E[X]^2-2X\E[X]]$ $=\E[X^2]+\E[X]^2-2\E[X]\E[X]$$=\E[X^2]-\E[X]^2$。因此假设一个随机变量的期望是已知的，衡量随机变量波动情况的关键信息其实就是$\E[X^2]$，这个项就称为“二阶矩”。类似地我们定义$\E[X^k]$为$k$-阶矩(k-th moment)。期望就是一阶矩。它是衡量随机变量分布情况的重要方法。根据我们化简的表达式，$\Var(aX)=\E[(aX)^2]-\E[aX]^2=$ $a^2(\E[X^2]-\E[X]^2)=a^2\Var[X]$。如果$X,Y$是独立的，$\Var(X+Y)=\E[(X+Y)^2]-\E[X+Y]^2=\E[X^2]+\E[Y^2]+2\E[XY]$ $-(\E[X]+\E[Y])^2$$=\E[X^2]+\E[Y^2]+2\E[X]\E[Y]-\E[X^2]-\E[Y^2]$ $-2\E[X]\E[Y]$$=\Var(X)+\Var(Y)$，也就是说独立时方差有线性性（一般情况没有）。特别地我们指出，$\Var(\sum X_i)=\sum \Var(X_i)$并不要求mutually independent这么强的条件，只要满足pairwise independent就行了。

### 矩生成函数(Moment Generating Function)

我们看到，期望和方差都是对随机变量的一些表现的描述。期望描述分布的平均情况，方差描述分布的偏差情况。以此类推，每个$k$-阶矩都应当描述了分布在某一方面的性质。 任何一个$k-$阶矩都是通过用单个数字来描述随机变量，从而提供随机变量的<u>部分</u>信息。 那么我们能否找到一个描述随机变量全部信息的方式？

我们可以以一个随机变量的所有的$k$-阶矩作为系数来构造一个指数生成函数：构造$M(\theta)=\sum\limits_{k \geq 0}\E[X^k]\dfrac{\theta^k}{k!}$。我们不妨假定$\E$的求和与$\sum$的求和是可交换的（后面我们将会证明这一点），那么就可以简写为$M(\theta)=\E\left[\sum\limits_{k\geq 0} \dfrac{(\theta X)^k}{k!}\right]$，这恰好是指数函数的泰勒展开形式，所以有$M(\theta)=\E[e^{\theta X}]$。这就称为$X$的矩生成函数，它描述了一个随机变量的所有信息。可以证明，如果两个随机变量的矩生成函数相等，那么这两个随机变量完全相等。

根据矩生成函数可以求出任意一个$k$-阶矩：根据$M(\theta)=\sum\limits_{k \geq 0}\E[X^k]\dfrac{\theta^k}{k!}$（假定了期望和求和可交换），有$\E[X^n]=\dfrac{d^nM(\theta)}{dx^n}\Bigg|_{\theta=0}$。

$M(\theta)$是关于$\theta$的函数。如果在原点附近$M$存在一个收敛半径， 即存在$\theta_0>0$使得$|M(\theta)|<\infty$在$[-\theta_0,\theta_0]$上恒成立，那么可以推出$X$的任意正整数阶矩都存在，也即任意$n \in \N$都有$X^n$可积。这正是因为根据泰勒展开，指数函数（在这里是正是我们的已知收敛的生成函数）就是$X^n$的一个上界——对于$x>0$，根据泰勒展开始终有$e^{\theta_0x} = \sum\limits_{k \geq 0}\dfrac{\theta_0^kx^k}{k!} \geq \dfrac{\theta_0^nx^n}{n!}$，因此$x^n \leq \dfrac{n!}{\theta_0^n}e^{\theta_0x}$恒成立。所以对于任意的$n$，$E[|X|^n] \leq E[\dfrac{n!}{\theta_0^n}e^{\theta_0 |x|}]=\dfrac{n!}{\theta_0^n}E[e^{\theta_0x}+e^{-\theta_0x}]=C(M(\theta_0)+M(-\theta_0))<\infty$。

### 条件期望

对随机变量$X$，$B\in \F,P(B)\neq 0$ ，定义条件期望 $\E[X\mid B]=\sum\limits_{x}x\cdot P(X=x\mid B)$ 。
可以证明全期望公式(Law of Total Expectation)：若 $B_1,B_2,...,B_n\in \F$ 是 $\Omega$ 的一个划分， $\E[X]=\sum_{i=1}^n \E[X\mid B_i]\cdot P(B_i)$ .

## 几类特殊的离散分布

### 伯努利分布(Bernoulli Distribution)

$X \sim Ber(p)$当且仅当$P(1)=p,P(0)=1-p=q$。例如，丢硬币有$p$的概率丢到正面，$1-p$的概率丢到反面。计算得到$\E[X]=p$，$\E[X^k]=p$，$\Var[X]=\E[X^2]-\E[X]^2=p-p^2=pq$，$M(\theta)=\E[e^{\theta X}]=p\cdot e^{\theta}+q \cdot e^0$ $=pe^\theta+q$。

### 二项分布(Binomial  Distribution)

$X \sim Bin(n,p)$当且仅当$X$是进行$n$次$Ber(p)$的伯努利试验后的成功总次数。计算得到$\E[X]=np$（期望线性性），$\Var[X]=npq$（独立变量的方差线性性）。$M(\theta)=\E[e^{\theta X}]=\sum\limits_{k=0}^{n}e^{\theta k} \cdot \dbinom{n}{k}p^kq^{n-k}$ $=(pe^\theta+q)^n$。

### 几何分布(Geometric Distribution)

$X \sim Geom(p)$当且仅当$P(X=k)=q^{k-1}p$。我们知道期望可以用等差乘等比的数列求和来得到，在这里我们采用其它方法来计算。我们先计算矩生成函数：$M(\theta)=\sum\limits_{k \geq 1}q^{k-1}pe^{\theta k}$，这就是一个等比级数的求和，化简得到$M(\theta)=\sum\limits_{k \geq 0}q^kpe^{\theta(k+1)}=pe^\theta\sum\limits_{k \geq 0}(qe^\theta)^k=\dfrac{pe^\theta}{1-qe^\theta}$。于是很容易算出期望（1阶矩）：$M'(\theta)=\dfrac{pe^\theta(1-qe^\theta)-pe^\theta(-qe^\theta)}{(1-qe^\theta)^2}=\dfrac{pe^\theta}{(1-qe^\theta)^2}$，$\E[X]=M'(0)=\dfrac{p}{(1-q)^2}=\dfrac{1}{p}$。求二阶导就能求出二阶矩，从而求出方差$Var[X]=\dfrac{q}{p^2}$。

### 超几何分布(Hypergeometric Distribution)

$X \sim Hyp(n,a,m)$指$n$个球里有$a$个白球$n-a$个黑球，现在取$m$个球，$P(X=k)$为取到$k$个白球的概率，因此$P(X=k)=\dfrac{\binom{a}{k}\binom{n-a}{m-k}}{\binom{n}{m}}$。它可以看作这$n$个不同的球随机排列去取前$m$个，于是有$X=\sum\limits_{i=1}^{m}\mathbb{1}[X_i \text{ is white}]$，那么根据期望的线性性$\E[X]=\sum\limits_{i=1}^{m}P(X_i\text{ is white})=m\cdot \dfrac{a}{n}$。求方差对上式平方展开后计算即可。

### 泊松分布(Poisson Distribution)

$X \sim Poi(\lambda)$当且仅当$P(X=k)=e^{-\lambda}\dfrac{\lambda^k}{k!}$。我们来理解这奇特的项是怎么来的。泊松分布是已知随机变量的平均值$\lambda$时对实际的分布情况的一种估计。例如考虑一段时间内的人流量，我们把这个时间段分成$n$段，当$n$足够大时每一小段时间里最多只能来一个人。我们认为人流量的分布是与时间无关的，于是每一段上人的来与不来形成一个二项分布。而由于我们已知总人流量的平均值（期望）是$\lambda$，因此必须有$np=\lambda$，也就是这个二项分布的概率必须满足$p=\dfrac{\lambda}{n}$。在这样的预设下我们就可以求出总人流量为$X=k$的概率：$P(X=k)=\dbinom{n}{k}\left(\dfrac{\lambda}{n}\right)^k\left(1-\dfrac{\lambda}{n}\right)^{n-k}$。现在让$n \to \infty$，于是$\lim\limits_{n \to \infty}P(X=k)=\lim\limits_{n \to \infty}\dfrac{n(n-1)\cdots (n-k+1)}{k!}\dfrac{\lambda^k}{n^k}\left(1-\dfrac{\lambda}{n}\right)^{n}\left(1-\dfrac{\lambda}{n}\right)^{-k}$ $=\dfrac{\lambda^k}{k!}\lim\limits_{n \to \infty}\left(1-\dfrac{\lambda}{n}\right)^{n}=e^{-\lambda}\dfrac{\lambda^k}{k!}$。这正是我们写出的泊松分布的项。它可以看作已知期望的二项分布的极限情况。$\sum\limits_{i} P(X=i)$确实等于1，因为提出常数项$e^{-\lambda}$以后留下的是$e^\lambda$的泰勒展开式。

泊松分布的矩生成函数$M(\theta)=\E[e^{\theta X}]=\sum\limits_{k}e^{-\lambda}\dfrac{\lambda^k}{k!}\cdot e^{\theta k}=e^{-\lambda}\sum\limits_{k}\dfrac{(\lambda e^{\theta})^k}{k!}$ $=e^{-\lambda}e^{\lambda e^{\theta}}$$=e^{\lambda (e^{\theta}-1)}$。于是$M'(\theta)=e^{\lambda(e^{\theta}-1)}\cdot \lambda e^\theta$，于是$\E[X]=M'(0)=\lambda$。二阶矩$\E[X^2]=\lambda(1+\lambda)$，于是$\Var(X)=\lambda$。

泊松分布满足一些简单的性质：例如$X \sim Poi(\lambda_1),Y \sim Poi(\lambda_2)$，就有$X+Y \sim Poi(\lambda_1+\lambda_2)$。一个有趣的性质是，我们可以用泊松分布来等价地描述小球装箱问题：把$m$个不同的小球装进$n$个不同的箱子里，每$i$个箱子里的小球数$X_i$就是一个随机变量，然而这$n$个随机变量显然不是独立的，所以当我们要刻画一个形如$f(X_1,\cdots,X_n)$的函数时是不太方便的。我们代入定义式计算就容易证明，我们可以用$n$个独立的满足泊松分布$Poi(\lambda)$的变量$Y_i$就可以代替$X_i$，只要满足前提$\sum\limits_{i}Y_i=m$。其中$\lambda$可以是任意的。所谓“代替”，就是$P[(X_1,\cdots,X_n)=(a_1,\cdots,a_n)]$与$P[(Y_1,\cdots,Y_n)=(a_1,\cdots,a_n)]$始终相等。我们注意到，前提$\sum\limits_{i}Y_i=m$依然是个很强的约束，因此还是不方便处理。事实上，这样的替换的真正用途往往是一些“放缩”的思路，我们把$\sum\limits_{i}Y_i=m$改为$Y_i \sim Poi(\dfrac{m}{n})$，可以证明不等式$\E[f(X_1,\cdots,X_n)] \leq e\sqrt{m}\E[(Y_1,\cdots,Y_n)]$对于任何$f:\N^n \to \N$恒成立。根据全期望公式$\E[f(Y_1,\cdots,Y_n)]=\sum\limits_{k}\E[f(Y_1,\cdots,Y_n)\mid \sum Y_i=k]P(\sum Y_i=k)$ $\geq \E[f(Y_1,\cdots,Y_n)\mid \sum Y_i=m]P(\sum Y_i=m)=\E[f(X_1,\cdots,X_n)]P(\sum Y_i=m)$$=\E[f(X_1,\cdots,X_n)]e^{-m}\dfrac{m^m}{m!}$，根据Stirling's Formula可以证明$m! =\sqrt{2\pi m}\dfrac{m^m}{e^m}(1+o(\dfrac{1}{m})) \leq e\sqrt{m}\dfrac{m^m}{e^m}$，于是$\E[f(X_1,\cdots,X_n)]e^{-m}\dfrac{m^m}{m!} \geq \E[f(X_1,\cdots,X_n)]\dfrac{1}{e\sqrt{m}}$。



















