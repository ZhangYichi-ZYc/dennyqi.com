## 随机过程(Stochastic Process)$\newcommand{\E}{\mathbb{E}}$

在渐进均分性中，我们讨论的是一列独立同分布的随机变量。现在我们要讨论一列并不独立同分布的随机变量，这样的一列随机变量通常被称为一个“随机过程”，记为$X_1,X_2,\cdots,X_t,\cdots$。随机变量$X_i$的下标$i$通常称为时间（必须是整数，但可以是负数），这样我们就能把这列随机变量看作一个随时间变化的状态。例如一维数轴上的随机游走就是一个随机过程。在这里，我们认为$X_i$的取值个数是可数的，这样的随机过程称为离散的随机过程。

一个随机过程的特性通过联合分布$\Pr[X_1=a_1\land X_2=a_2\land \cdots \land X_t=a_t],\forall t$来刻画（假设$t$从1开始）。如果对于任意的整数$n,l$，联合分布都满足$\Pr[X_1=a_1\land \cdots \land X_n=a_n]$ $=\Pr[X_{1+l}=a_{1+l}\and\cdots\land X_{n+l}=a_{n+l}]$，就称这个随机过程是stationary(平稳)的。也即这个随机过程中变量的分布是与时间无关的。如果一个随机过程满足对任意的时间$t$都有$\Pr[X_t=a_t\mid X_{t-1}=a_{t-1},\cdots,X_1=a_1]=$ $\Pr[X_t=a_t\mid X_{t-1}=a_{t-1}]$，也即每个随机变量的取值分布都只与前一时间的随机变量有关，就称这个随机过程是一个（离散）马尔可夫链(Discrete Markov Chain)。一维随机游走就是一个马尔可夫链。如果$X_t$可能的取值是有限的，假设不超过$n$种，那么我们就能用一个$n\times n$的矩阵$P_t$来描述$\Pr[X_t=a_t\mid X_{t-1}=a_{t-1}]$。这称为这个马尔可夫链的状态转移矩阵。对于一个stationary的马尔可夫链，状态转移矩阵与时间$t$无关，那么只需要一个矩阵$P$以及初始分布$X_1$就可以完全刻画这个马尔可夫链：设$X_t$的分布为$\mu_t$，那么$\mu_t^\top P=\mu_{t+1}^\top$。由此，$\mu_t^\top=\mu_1^\top P^{t-1}$。

对于stationary的有限马尔可夫链，如果存在一个分布$\pi$满足$\pi^\top P=\pi^\top$，也即状态转移后分布不变，那么称$\pi$为一个稳态分布(Stationary Distribution)。我们可以证明，stationary的马尔可夫链一定存在一个稳态分布（证明：即证方程$P^\top \pi=\pi$有界，这等价于$P^\top$有特征值1。[chihao的随机过程](https://notes.sjtu.edu.cn/s/MrxpBF2DI#The-Existence-of-Stationary-Distribution)中给出了具体证明）。

## 熵率(Entropy Rate)$\newcommand{\X}{\mathcal{X}}$

一个随机过程的熵率定义为$H(\mathcal{X})=\lim\limits_{n\to\infty}\dfrac{1}{n}H(X_1,X_2,\cdots,X_n)$，它描述前$n$个随机变量的联合熵取平均值随$n$趋向无穷后的取值。

对于一个stationary的随机过程，熵率是well-defined的，因为我们可以证明这一极限始终存在。根据链式法则，$H(X_1,\cdots,X_n)=\sum\limits_{i=1}^{n}H(X_i\mid X_1,\cdots,X_{i-1})$，于是$\lim\limits_{n\to\infty} \dfrac{1}{n}\sum\limits_{i=1}^{n}H(X_i\mid X_1,\cdots,X_{i-1})$。现在对于stationary的随机过程，我们注意到$H(X_n\mid X_1,\cdots,X_{n-1})$一定是收敛的：根据条件熵的性质，始终成立$H(X_{n+1}\mid X_1,\cdots, X_n)\leq H(X_{n+1}\mid X_2,\cdots,X_n)$，而根据stationary这就等于$H(X_{n}\mid X_1,\cdots,X_{n-1})$。也即$H(X_n\mid X_1,\cdots,X_{n-1})$一定是随$n$递减的，而由于熵是非负的，它有下界$0$。那么根据单调有界必收敛，$H(X_n\mid X_1,\cdots,X_{n-1})$一定收敛，我们把这个极限记为$H'(\X)$。根据Cauchy命题，熵率$H(\X)$恰好等于这个极限$H'(\X)$。因此对于stationary的随机过程，也可以定义熵率为$\lim\limits_{n\to\infty}H(X_n\mid X_1,\cdots,X_{n-1})$。这通常是更容易计算的，它描述了前$n$个随机变量对随后的随机变量贡献的信息的极限情况。换言之，它描述了随着时间增长时熵的<u>增长率</u>。

对于stationary的马尔可夫链，$H(\X)=H'(\X)=\lim\limits_{n\to\infty}H(X_n\mid X_1,\cdots,X_{n-1})=\lim\limits_{n\to\infty}H(X_n\mid X_{n-1})$ $=\lim\limits_{n\to\infty}H(X_2\mid X_{1})=H(X_2\mid X_{1})$。设$X_1$的可能取值集合为$\{v_i\}$，取$v_i$的概率为$\mu_i$，则$H(X_2\mid X_1)=\sum\limits_{i}\mu_i H(X_2\mid X_1=v_i)$ $=\sum\limits_{i}\mu_i\sum\limits_{j}(-P_{ij}\log P_{ij})$。对于一般的马尔可夫链，我们可以证明（见[chihao的随机过程](https://notes.sjtu.edu.cn/s/MrxpBF2DI#The-Existence-of-Stationary-Distribution)）如果它满足irreducible与aperiodic，那么它有唯一的稳态分布，并且任意初始分布都会收敛于稳态分布。自然，此时取$\mu$为这个稳态分布代入上式依然会得到正确的熵率。

## 马尔可夫链的函数$\newcommand{\Y}{\mathcal{Y}}$

对于stationary马尔可夫链$X_1,\cdots,X_n,\cdots$和函数$\phi$，由$\phi$给出了新的一列随机变量$Y_i=\phi(X_i)$，我们称它为马尔可夫链$\X$的函数$\mathcal{Y}$。此时，我们并不能由此说明$Y_i$是马尔可夫链。事实上很多时候$\Y$并不是马尔可夫链。然而由于$\X$是时间无关的(stationary)，因此$\Y$也势必是时间无关的。因此，用同样的方法可以论证熵率$H(\Y)=H'(\Y)=\lim\limits_{n\to\infty}H(Y_n\mid Y_1,\cdots,Y_{n-1})$依然是well-defined的。

在计算熵率$H(\Y)$时，如果仅仅计算$H(Y_n\mid Y_1,\cdots,Y_{n-1})$是难以判断收敛的，因为收敛数列本身的差分是不足以判断收敛情况的（调和级数就是例子）。为此，我们希望能给出$H(\Y)$的关于$n$的上下界，如果上下界充分靠近就能判定收敛。在定义stationary随机过程的熵率时，我们已经证明了单调递减性$H(Y_{n+1}\mid Y_1,\cdots, Y_n)\leq H(Y_{n}\mid Y_1,\cdots,Y_{n-1})$，这其实已经给出了上界$H(\Y)\leq H(Y_n\mid Y_1,\cdots,Y_{n-1})$始终成立。对于下界，我们惊奇地发现只要把$Y_1$替换为$X_1$，就得到了下界$H(\Y)\geq H(Y_n\mid X_1,Y_2,\cdots,Y_{n-1})$，并且

这一对上下界最终会夹逼收敛到$H(\Y)$。推导如下：由于$Y_1$是$X_1$的函数，因此在$H(Y_{n}\mid X_1,Y_2\cdots,Y_{n-1})$中增加条件$Y_1$并不会改变熵的大小，于是$H(Y_{n}\mid X_1,Y_2,\cdots,Y_{n-1})=H(Y_{n}\mid X_1,Y_1,Y_2,\cdots,Y_{n-1})$。而$X$是马尔可夫链，所以再往里加入$X_0,X_{-1},\cdots$以及对应的函数值$Y_0,Y_{-1},\cdots$所有这些过时的条件也完全不能改变熵，因此又有$=H(Y_n\mid X_{-k},\cdots,X_0,X_1,Y_{-k},\cdots,Y_0,Y_1,Y_2,\cdots,Y_{n-1})$。现在丢掉所有$X$的条件，熵会变大，也即$\leq H(Y_n\mid Y_{-k},\cdots,Y_0,Y_1,\cdots,Y_{n-1})$。根据stationary，平移$k+1$个时间单位，得到$H(Y_{n}\mid X_1,Y_2\cdots,Y_{n-1})\leq$ $H(Y_{n+k+1}\mid Y_1,\cdots,Y_{n+k})$。RHS在$k\to\infty$时就是$H(\Y)$，因此$H(Y_{n}\mid X_1,Y_2\cdots,Y_{n-1})\leq H(\Y)$。最后我们要验证$n\to \infty$时，$H(Y_n\mid Y_1,\cdots,Y_{n-1})-H(Y_n\mid X_1,Y_2,\cdots,Y_{n-1})\to 0$。首先，把$H(Y_n\mid X_1,Y_2,\cdots,Y_{n-1})$写作$H(Y_n\mid X_1,Y_1,Y_2,\cdots,Y_{n-1})$，那么这个差可以等价地写作互信息$I(Y_n;X_1\mid Y_1,\dots,Y_{n-1})$。要证它趋于0，只需证级数$\sum\limits_{i=1}^{\infty}I(Y_i;X_1\mid Y_1,\cdots,Y_{i-1})$收敛，而根据链式法则，这个级数等价于$\lim\limits_{n\to\infty}I(X_1;Y_1,Y_2,\cdots,Y_n)$。而$I(X_1;Y_1,\cdots,Y_n)$始终有上界$H(X_1)$，并且级数$\sum\limits_{i=1}^{\infty}I(Y_i;X_1\mid Y_1,\cdots,Y_{i-1})$显然是正项的。因此收敛得证。

最终我们得到了夹逼：$H(Y_{n}\mid X_1,Y_2\cdots,Y_{n-1})\leq H(\Y)\leq H(Y_n\mid Y_1,\cdots,Y_{n-1})$。



























