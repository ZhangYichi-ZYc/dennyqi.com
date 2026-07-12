## 二阶矩，方差，切比雪夫不等式

我们可以验证如果两个随机变量$X,Y$是独立的，那么一定满足$E[X\cdot Y]=E[X] \cdot E[Y]$。只需根据定义把右侧表示出来，$E[X] \cdot E[Y]$ $=\left(\sum\limits_{x}x\Pr[X=x]\right)\left(\sum\limits_{y}y\Pr[Y=y]\right)$$=\sum\limits_{x}\sum\limits_{y}xy\Pr[X=x]\Pr[Y=y]$，根据独立的定义$\Pr[X=x]\cdot \Pr[Y=y]=\Pr[X=x \land Y=y]$，因此写出$\sum\limits_{x}\sum\limits_{y}xy\Pr[X=x \land Y=y]$，我们转而枚举$x\cdot y$，对于每个确定的$x\cdot y$，我们需要把所有$\Pr[X=x \land Y=y]$累加起来，而这得到的就是$\Pr[X\cdot Y=x\cdot y]$（充分必要），这样就写出$\sum\limits_{k}k\Pr[X\cdot Y=k]$，这就是$E[X \cdot Y]$的定义本身了。证毕。而当它们不独立时，容易举出反例说明这是不满足的。

对于任意的随机变量$X$，就称$E[X^2]$为$X$的二阶矩。注意到$E[X^2]\neq (E[X])^2$，例如在$\{1,99\}$里选一个数，这构成随机变量$X$。而$E[X^2]=\sum\limits_{i=1}^{99}i^2 \Pr(X=i)$ $=\dfrac{\sum\limits_{i=1}^{99}i^2}{99}=\dfrac{9950}{3}$。而$(E[X])^2=\left(\sum\limits_{i=1}^{99}\dfrac{i}{99}\right)^2=2500$。

于是我们定义$X$的方差$Var[X]=E[X^2]-(E[X])^2$。即方差等于二阶矩减去期望的平方。根据期望的线性性，我们可以验证$Var[X]=E[(X-E[X])^2]$与此等价，因为$E[X^2+(E[X])^2-2XE[X]]=E[X^2]+(E[X])^2-2E[X]E[X]$ $=E[X^2]-(E[X])^2$。通过后者，我们容易看到方差反应的是随机变量与期望的偏离程度。比如当随机变量恒为$E[X]$时，方差为0。而如果随机变量有比较大的波动，则$Var[X]$也会较大。

我们可以直接验证$Var[X+Y]=E[(X+Y)^2]-(E[X+Y])^2$，根据期望的线性性展开可得$Var[X+Y]=E[X^2]+E[Y^2]+2E[X\cdot Y]-E[X]^2-$ $E[Y]^2$$-2E[X]E[Y]$ $=Var[X]+Var[Y]+2E[X \cdot Y]-2E[X]E[Y]$。所以我们看到，只有当$X,Y$独立时我们消去后面的项得到$Var[X+Y]=Var[X]+Var[Y]$。这说明当随机变量独立时方差也具有线性性。

现在，我们希望能够定量地描述“方差反应波动性”这一事实。这就是著名的切比雪夫不等式，它指出$\forall a>0$，$\Pr[|X-E[X]| \geq a] \leq \dfrac{Var[X]}{a^2}$。对于任意fix的一个$a$，方差越大随机变量偏离$E[X]$超过$a$的概率越大。而它其实本质上只是Markov不等式——我们可以直接根据Markov不等式得到$\Pr[|X-E[X]|\geq a]$ $=\Pr[(X-E[X])^2\geq a^2]\leq \dfrac{E[(X-E[X])^2]}{a^2}=\dfrac{Var[X]}{a^2}$。

> 考虑值域为$[0,n]$中的整数的一个随机变量$X$。如果要证明$n \to +\infty$时$\Pr[X=0]\to 1$，只需证明$\Pr[X\geq 1] \to 0$，根据Markov不等式只需证明$E[X] \to 0$。但这个方法却不能倒过来使用，如果$E[X] \to +\infty$，不能保证$\Pr[X \geq 1] \to 1$，所以也无法推出$\Pr[X=0] \to 0$。此时可以用切比雪夫不等式，$\Pr[X=0] \leq \Pr[|X-E[X| \geq E[X]]\leq \dfrac{Var[X]}{(E[X])^2}$ $=\dfrac{E[X^2]-(E[X])^2}{(E[X])^2}$，因此只需证明$\lim E[X^2]=\lim (E[X])^2$即可。这样我们就找到了一个证明方法了。

## 随机图上的相变

我们已经知道给定顶点个数$n$和一个实数$p \in [0,1]$就可以随机生成一张图。现在我们假设$p$是由顶点个数决定的一个函数$p(n)$。这样生成的随机图记为$G(n,p(n))$。如果存在一个关于$n$的函数$r(n)$满足，当$p(n) \ll r(n)$时图的“某个性质”成立的概率在$n \to +\infty$时趋向0，而当$p(n) \gg r(n)$时图的这个性质成立的概率在$n \to +\infty$时趋向1，那么就说图的这个性质是“具有相变性”的。其中$r(n)$就被称为图的这个性质的阈值函数。

下面我们来证明，“包含一个大小为4的完全图”这一性质是有相变性的。

设随机变量$X$表示$K_4$的数量，那么性质成立对应事件$X \geq 1$。根据Markov不等式$\Pr[X \geq 1]\leq E[X]$。根据期望的线性性，我们枚举所有的大小为$4$的点集累加它们是完全图的概率，得到$E[X]=\dbinom{n}{4}\cdot p^{\binom{4}{2}}=\dfrac{n!}{4!(n-4)!}p^6 \leq n(n-1)(n-2)(n-3)p^6 \leq n^4p^6$。当$n \to +\infty$时，为了使它趋向0，可以取$r(n)=n^{-\frac{2}{3}}$。

接下来我们来验证$r(n)=n^{-\frac{2}{3}}$也能满足$p(n) \gg r(n)$的情况。根据切比雪夫不等式，$\Pr[X=0] \leq \Pr[|X-E[X| \geq E[X]]\leq \dfrac{Var[X]}{(E[X])^2}=\dfrac{E[X^2]-(E[X])^2}{(E[X])^2}$。我们依旧把$X$写作$\sum\limits_{S \in \binom{[n]}{4}}X_S$，其中$X_S=\mathbb1[S构成完全图]$，那么暴力代入$E[X^2]-(E[X])^2$得到$E\left[\left(\sum\limits_{S \in \binom{[n]}{4}}X_S\right)^2\right]-\left(E\left[\sum\limits_{S \in \binom{[n]}{4}}X_S\right]\right)^2$ $=\sum\limits_{S}E[X_S^2]+2\sum\limits_{S \neq T}E[X_SX_T]-\sum\limits_{S}(E[X_S])^2-2\sum\limits_{S \neq T}E[X_S]E[X_T]$。合并同类项，得$\sum\limits_{S}(E[X_S^2]-(E[X_S])^2)+2\sum\limits_{S \neq T}(E[X_SX_T]-E[X_S]E[X_T])$。对于$E[X_SX_T]-E[X_S]E[X_T]$这个结构，如果$X_S$与$X_T$独立它就等于0。什么时候独立呢？如果$S$和$T$不可能形成公共边，那么一定独立，这意味着如果$S,T$共同的点的个数为0或者为1，都是独立的。那么不独立的情况要么共同点为2，要么为3。如果共同点为2，那么共有1条公共边，因此两个完全图共有$11$条边，发生概率为$p^{11}$，$E[X_SX_T]=p^{11}$；如果共同点为3，那么有3条公共边，两个完全图共9条边，发生的概率为$p^9$，$E[X_SX_T]=p^{9}$。对于这些情况，我们把负的项丢掉，只求解$\sum\limits_{S \neq T}E[X_SX_T]$，等于$\sum\limits_{|S \cap T|=2}E[X_SX_T]+\sum\limits_{|S \cap T|=3}E[X_SX_T]$ $=\dbinom{n}{2}\dbinom{n-2}{2}\dbinom{n-4}{2}p^{11}+\dbinom{n}{3}\dbinom{n-3}{1}\dbinom{n-4}{1}p^{9} \leq n^6p^{11}+n^5p^9$。把最初的$\sum\limits_{S}(E[X_S^2]-(E[X_S])^2)$也放缩为$\sum\limits_{S}E[X_S^2]=\dbinom{n}{4}p^6 \leq n^4p^6$。综上得到$E[X^2]-(E[X])^2 \leq n^4p^6+2n^6p^{11}+2n^5p^9$。代入$p \sim n^{-\frac{2}{3}}$，得到$1+2n^{-\frac{4}{3}}+2n^{-1} \to 1$。而$E[X]^2 = \left(\dfrac{n!}{4!(n-4)!}\right)^2p^{12} \sim n^8p^{12}$，因此$\dfrac{E[X^2]-(E[X])^2}{(E[X])^2} \sim \dfrac{1}{n^4p^{6}}+\dfrac{2}{n^2p}+\dfrac{2}{n^3p^{3}} \to 0$。当$p$更大时，它只会更小。这样就验证了当$p(n) \gg r(n)$时$\Pr[X=0] \to 0$。因此$\Pr[X \geq 1] \to 1$。

## Weierstrass近似定理

在一个闭区间上的任意一个连续的函数都可以被一个多项式函数任意地近似。我们现在使用二阶矩方法来证明这个定理。这个定理严格地（等价地）表述为：

给定$f:[0,1] \to [-1,1]$，$f \in C$，则$\forall \varepsilon>0$，$\exists$多项式$p$满足$\forall x\in [0,1]$成立$|p(x)-f(x)|<\varepsilon$。

我们在$[0,1]$上等间距地选点$\dfrac{1}{n},\dfrac{2}{n},\cdots,\dfrac{n-1}{n}$。我们令$P(x)=\sum\limits_{i=0}^{n}E_i(x)\cdot f\left(\dfrac{i}{n}\right)$。即对于每个确定的$x$，多项式的取值都是这些划分点上的函数值的某个加权平均。这$n+1$个系数是由$x$来确定的，因此这些系数本身就是$n+1$个函数，由于加和后得到多项式，因此我们要求所有这些函数都是多项式函数。其次，我们令$\sum\limits_{i=0}^{n}E_i(x)=1$，也就是这些系数构成一个$[0,1]$上的概率分布。由于我们是用$P(x)$来逼近$f(x)$，当$x$位于某个最近的$\dfrac{i^*}{n}$附近时，我们希望概率分布都集中在$E_{i^*}$附近。

既然$E(x)$是概率分布，我们可以用随机变量$Y$来表示这个分布，其中$Y$在$0,1,\cdots,n$内取值，那么只需令$E_i(x)=\Pr[Y=i]$。（从现在开始，我们都可以认为$x$是常数了。）对于每个$x$，我们希望$E_i(x)$在$i^*\approx nx$附近取值最大，这样才能使加权平均后$P(x)$最接近$f\left(\dfrac{i^*}{n}\right)$。所以我们希望随机变量取$nx$的概率最大。这让我们想到二项分布$Bin(n,x)$，即独立重复$n$次成功概率为$x$的实验后成功的次数，因为二项分布满足$E[Y]=nx$，正好符合我们想让$Y$取$nx$概率最大的期待。也就是说，取$E_i(x)=\dbinom{n}{i}x^i(1-x)^{n-i}$这样的分布能满足我们的要求吗？

分布是否靠近我们想要的值可以用方差来衡量，定量地，我们有切比雪夫不等式。$\Pr[|Y-nx| \geq n^{\frac{2}{3}}] \leq \dfrac{Var[Y]}{n^{\frac{4}{3}}}$。而$Var[Y]=nx(1-x) \leq \frac{n}{4}$，因此$\leq \dfrac{n^{-\frac{1}{3}}}{4}$。于是我们可以验证我们的逼近：

$|P(x)-f(x)|=\left|\sum\limits_{i=0}^{n} E_i(x)\cdot f\left(\dfrac{i}{n}\right)-f(x)\right|=\left|\sum\limits_{i=0}^{n} E_i(x)\cdot f\left(\dfrac{i}{n}\right)-f(x)\sum\limits_{i=0}^{n}E_i(x)\right|$，因为$E_i$是一个概率分布。这样我们我们就可以合并得到$=\left|\sum\limits_{i=0}^{n} E_i(x)\cdot \left[f\left(\dfrac{i}{n}\right)-f(x)\right]\right|$，用绝对值三角不等式放缩得到$\leq \sum\limits_{i=0}^{n}E_i(x)\left|f\left(\dfrac{i}{n}\right)-f(x)\right|$。对于$i$我们可以按照刚才切比雪夫不等式中的分割线来分成两类，写出$=\sum\limits_{|i-nx|\leq n^\frac{2}{3}}E_i(x)\left|f\left(\dfrac{i}{n}\right)-f(x)\right|+\sum\limits_{|i-nx|>n^ \frac{2}{3}}E_i(x)\left|f\left(\dfrac{i}{n}\right)-f(x)\right|$。考虑前面一项，根据$f$一致连续，当$n$足够大时$\left|f\left(\dfrac{i}{n}\right)-f(x)\right|$可以小于任意的$\varepsilon$，因此整个第一项可以小于$\varepsilon$。而后面一项中根据我们切比雪夫不等式的结果$E_i(x)$加和是很小的，我们把$\left|f\left(\dfrac{i}{n}\right)-f(x)\right|$直接放缩成$2$，$E_i(x)$的加和$\leq \dfrac{n^{-\frac{1}{3}}}{4}$，当$n$足够大的时候也可以任意小。综上$n$足够大时$|P(x)-f(x)|$可以任意小，证毕。

































