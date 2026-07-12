## 条件期望$\newcommand{\E}{\mathbb{E}}\newcommand{\F}{\mathcal{F}}$

对于随机变量$Y$和事件$B$，我们定义$Y$关于$B$条件期望为$\E[Y\mid B]=\dfrac{\E[Y \cdot \mathbb{1}_B]}{P(B)}$，直观理解为在已知$B$发生时$Y$的平均取值。现在我们希望定义一个随机变量$Y$关于另一个随机变量$X$的条件期望$\E[Y\mid X]$。

假设$X$是离散的，只能取$x_1,x_2,\cdots$，那么对于$X$的每个取值$X=x_n$这都是一个事件，因此可以写出$\E[Y\mid X=x_n]=\dfrac{\E[Y\cdot \mathbb{1}[X=x_n]]}{\Pr[X=x_n]}$。可见$\E[Y\mid X=x_n]$只与$x_n$有关，因此$\E[Y\mid X]$可以看作关于$X$取值的函数，<u>也即$\E[Y\mid X]$是一个随机变量</u>，$\E[Y\mid X](\omega)=\E[Y\mid X=X(\omega)]$。

注意到$\E[Y\mid X]$是$\sigma(X)$-可测的，因为这个随机变量就是根据$X$的取值定义的，它只取决于$X$划分集合的方式，只需要知道$X(\omega)$而不需要知道具体的$\omega$就能定义$\E[Y\mid X]$。所以我们会把$\E[Y\mid X]$等价地写作$\E[Y\mid \sigma(X)]$。后者是更本质的写法，因为本质上我们只关心$\sigma(X)$。我们知道$\sigma$-algebra描述信息，那么<u>$\E[Y\mid \sigma(X)]$的含义就是已知$X$这一信息时对$Y$的平均值的估计</u>。

在大多数应用场景下，我们只需要$X$是离散的就够了。但我们能够定义$X$是连续情形下的$\E[Y\mid X]$。

首先，如果$X,Y$有joint density，那么可以直接仿照离散情形写出$\E[Y\mid X=x]=\displaystyle\int_\R y \cdot f_{Y\mid X}(y\mid x)dy$，它就是一个随机变量。

而如果joint density不存在，问题就变得复杂。本质上，我们要对于一个$\sigma$-algebra $G$定义$\E[Y \mid G]$。对于固定的$G$，我们观察到对于离散的随机变量会满足两个性质：第一点是，对于两个$G$-可测的随机变量$X,X'$，如果$\forall C \in G$都满足$\E[X\cdot\mathbb{1}_C]=\E[X'\cdot\mathbb{1}_C]$，那么almost surely成立$X=X'$。也即所有可能的$C$上随机变量的期望唯一确定随机变量本身；第二点是，对于well-defined的$\E[Y\mid X]$，$\forall C \in \sigma(X)$成立$\E[\E[Y\mid X]\cdot \mathbb{1}_C]=\E[Y\cdot \mathbb{1}_C]$（$C$上$Y$的平均值等于在不同$X$的前提下$Y$的平均值的平均值）。现在一个重要的定理告诉我们，在概率空间$(\Omega,\mathcal{F},P)$上如果$G \subseteq \mathcal{F}$，那么对于任何随机变量$Y$，总存在一个$G$-可测的随机变量$Z$成立$\forall C \in G,\E[Z\cdot \mathbb{1}_C]=\E[Y\cdot \mathbb{1}_C]$。那么根据第二点观察，$Z$有着离散情形下$\E[Y\mid G]$拥有的性质，根据第一点观察$Z$是唯一的。<u>于是我们就定义$Z$为$\E[Y \mid G]$</u>，对于随机变量$X,Y$，$\E[Y \mid X]$就定义为$\E[Y \mid \sigma(X)]$。也就是如果我们能验证一个随机变量满足$\forall C \in G,\E[Z\cdot \mathbb{1}_C]=\E[Y\cdot \mathbb{1}_C]$这条性质，它就是我们要的条件期望。

下面列举一些条件期望满足的重要性质：$\E[\E[Y\mid G]]=\E[Y]$（这就是上面的第二点观察中取$C$为全集的特殊情况。）；$G=\varnothing$或$G=\Omega$时，$\E[Y\mid G]=\E[Y]$；如果$Y$是$G$可测的，那么$\E[Y\mid G]=Y$（因为$G$比$Y$更细，条件期望时$Y$取常数）；$\E[aX+bY\mid G]=a\E[X\mid G]+b\E[Y\mid G]$（线性性）；若$Y$是$G$可测的，则$\E[XY\mid G]=Y\cdot \E[X\mid G]$；若$X \bot \sigma(G)$，则$\E[X\mid G]=\E[X]$；条件期望版本的Monotone Converge Theorem；若$G_1\subseteq G_2$，则$\E[\E[X_1|G_1]|G_2]=\E[\E[X_1|G_2]|G_1]=\E[X|G_1]$（Tower Rule：“粗人和细人打架，粗人获胜”——chihao）；条件期望的Jensen不等式，对于凸函数$f$满足$\E[f(X)\mid G]\geq f(\E[X\mid G])$。

## Martingale(鞅)的定义

假设用一个公平游戏来赌博，比如抛硬币，设正面算我们赢，反面算我们输。我们第一次下注￥1，如果赢了就结束，输了就下注￥2再来一次，再输就下注￥4……每次翻倍。我们能够发现只要我们赢一次，我们手上的钱就一定是￥1。这样的赌博策略就是Martingale的原意。这个策略可以用严格的数学语言来描述。在这个例子里，我们设$X_i$是第$i$轮结束时手上的钱数，$Y_i$是第$i$轮赚或输的钱数。那么$X_{n+1}=X_n+Y_n$。抛硬币这一公平游戏的实质在于$\E[X_{n+1}\mid\sigma(X_1,\cdots,X_n)]=X_n$对于每一轮都成立：$\E[X_{n+1}\mid \sigma(X_1,\cdots,X_n)]=\E[X_n+Y_{n+1}\mid \sigma(X_1,\cdots,X_n)]$，根据线性性化简为$X_n+\E[Y_{n+1}\mid \sigma(X_1,\cdots,X_n)]$，而抛硬币一定成立$\E[Y_{n+1}\mid\sigma(X_1,\cdots,X_n)]=0$，由此得到$\E[X_{n+1}\mid\sigma(X_1,\cdots,X_n)]=$ $X_n$。（我们也会把$\E[X_{n+1}\mid \sigma(X_1,\cdots,X_n)]$简写为$\E[X_{n+1}\mid X_1,\cdots,X_n]$）

我们更一般地描述Martingale的定义。对于一列$\sigma$-algebra $\mathcal{F_0}\subseteq\mathcal{F_1}\subseteq\cdots$（称为一个filtration）和一列随机变量$X_0,X_1,\cdots$，如果每个$X_n$都是$\mathcal{F}_n$可测的，且对于每个$n$都满足$\E[X_{n+1}\mid \mathcal{F}_n]=X_n$，则称$\{X_n\}$是关于$\{\mathcal{F}_n\}$的Martingale。

> 如果条件$\E[X_{n+1}\mid \mathcal{F}_n]=X_n$改为$\E[X_{n+1}\mid \mathcal{F}_n]\geq X_n$，则称为Submartingale；改为$\E[X_{n+1}\mid \mathcal{F}_n]\leq X_n$，则称为Supermartingale；不等号的情况可以分解为等号的情况，对于Submartingale，满足$\E[X_{n+1}\mid\F_{n}]\geq X_n$，那么记$Y_n=\sum\limits_{i<n}(\E[X_{i+1}\mid\F_{i}]-X_i)$，则有$X_n-Y_n$是（关于$\F_n$的）Martingale。

从Martingale的定义可以看出，我们手上的钱在期望意义下每一轮是不变的。我们决定在第一轮赌一块钱，最终就一定还是剩下一块钱。 换言之我们一定有$\E[X_n]=\E[X_0]$。这只需要在$\E[X_{n+1}\mid \mathcal{F_n}]=X_n$两边同时取期望得到$\E[X_{n+1}]=\E[X_n]$，然后归纳即可。

我们举出几个另外的Martingale的例子：令$X_{n+1}=X_n\cdot Y_{n+1}$，如果$\E[Y_{n+1}\mid X_0,\cdots,X_n]=1$，则$X_n$也是Martingale；对于凸函数$\phi$，如果$X_n$是Martingale，那么$\phi(X_n)$是Submartingale；对于随机变量列$\{X_n\}$，记$\F_n=\sigma(X_1,\cdots,X_n)$，令$X=f(X_1,\cdots,X_n)$，则$\E[X\mid \F_n]$（这是一个随机变量，记为$Y_n$）总是关于$\F_n$的Martingale。（Pf：$\E[Y_{n+1}\mid\F_n]=\E[\E[X\mid \F_{n+1}]\mid \F_n]=\E[X\mid \F_n]=Y_n$。）也就是由已知信息的增长形成的条件期望列一定会形成一个Martingale，这称为Doob Martingale。

## Optional Stopping Theorem(OST，选择停时定理)

我们已经看到对于$\F_n$上的martingale $X_n$，对于任何$n\in\N$满足$\E[X_n]=\E[X_0]$。现在我们想知道如果把下标$n$换做一个随机变量，这一事实还是否成立。特别地，我们把$n$换成一个称为stopping time(停时)的随机变量$\tau$。stopping time随机变量满足对于任意的$n \in \N$，可以由$n$轮以前的信息决定$\tau$是否大于$n$。例如，玩游戏时如果玩$\tau$把之后停下，那么把stopping time设定为“连赢5把就不玩了”就是一个停时，因为在任何一轮游戏结束后有没有连赢五把都是这之前的游戏结果决定的。严格地，我们定义$\tau$是随机变量$\Omega\to \N$，满足$\forall n>0$，$\mathbb{1}[\tau > n]$都是$\F_n$可测的。容易发现，$\E[X_\tau]=\E[X_0]$此时不总是成立的了，在最初的martingale的例子中，每次停下来时都恰好赢了一块钱，因此$\E[X_\tau]=1$，而$\E[X_0]=0$。

所以我们想要探究使得$\E[X_\tau]=\E[X_0]$的stopping time $\tau$应当满足的条件。我们有以下Optional Stopping Theorem，它指出满足下列三个条件之一就一定成立$\E[X_\tau]=\E[X_0]$：① $\tau$ a.s. 有界（也即$\exists M>0,\Pr[\tau\leq M]=1$）；② $\Pr[\tau < \infty]=1$且$\exists M$使得$|X_i|\leq M$对任意$i \leq \tau$成立；③ $\E[\tau]<\infty$且$\exists M$使得$\forall i \in \N$都有$\E[|X_{i+1}-X_i|\mid \F_i]\leq M$。

我们先来看看OST的强大作用，之后再证明它的正确性。

### 村庄的男女比例

我们有以下这个经典的例子：有一个男女比例初始为1:1的村庄，这个村庄里的家庭有一些重男轻女的生育策略。假设生出男孩和女孩的概率相同。

第一种策略是，每户家庭都一直生直到生出男孩。对于某户家庭，用$X_i$表示生了$i$个小孩后男孩比女孩多几个。“生出男孩就停”是一个stopping time，$X_\tau$表示停下时男孩比女孩多几个。要讨论足够长时间后村庄的男女比例，就是讨论这种策略下是否有$\E[X_\tau]=\E[X_0]$。用OST就可以直接分析这个问题：$\E[\tau]=\sum\limits_{n \geq 1}\dfrac{n}{2^n}=2<\infty$，$\E[|X_{i+1}-X_i|\mid \F_i]\leq 1$，因此符合OST的第三个充分条件——由此可知“一直生直到生出男孩”的策略是不会影响男女比例的！

第二种策略是，每户家庭都一直生直到男孩比女孩多一个。显然这时候一定有$\E[X_\tau]=1\neq 0$，因此这样的策略下男女比例是不平衡的。得出这个结论我们并没有用到OST，但我们来看看结合OST我们能得到什么结论。对于第三个充分条件，$\E[|X_{i+1}-X_i|\mid \F_i]\leq 1$依然满足，可见$\E[\tau]<\infty$一定不满足，也即一定有$\E[\tau]=\infty$。从随机游走的角度来看（生孩子本质上和一维随机游走是同一个模型），从0随机游走到1的期望步数是无穷步！

第三种策略是，每户家庭都一直生直到男孩比女孩多一个，或这户家庭的总孩子数到达上限$m$。此时一定有$\tau\leq m$，因此满足OST的第一个条件，因此这种策略下男女比例也是平衡的！由此可见第二种策略之所以会导致男女不平衡在于一户家庭的总孩子数可能趋向无穷。

### Wald's Equation

我们知道当$T$是一个随机变量时，$\E[\sum\limits_{i=1}^{T}X_i]=\sum\limits_{i=1}^{T}\E[X_i]$不一定成立（取$X_i=T$恒成立即可）。这个等式称为Wald's Equation。那么满足什么样的条件时这个等式成立呢？我们考虑用OST来构造：如果$X_i,T$都是非负的，$X_i\sim X$且独立同分布，$T$是一个stopping time，且$\E[T],\E[X]<\infty$，那么Wald's Equation成立。也即此时成立$\E[\sum\limits_{i=1}^{T}X_i]=\sum\limits_{i=1}^{T}\E[X_i]=\E[X]\E[T]$。这似乎是出人意料的，因为它没有要求$T$和$X_i$独立。设$Z_t=\sum\limits_{i=1}^{t}(X_i-\E[X_i])$，那么$Z_t$是一个martingale。因为$\E[Z_{t+1}\mid \F_t]=\E[Z_t+X_{t+1}-\E[X_{t+1}]\mid \F_t]=\E[Z_t\mid \F_t]+\E[X]-\E[X]=$ $\E[Z_t\mid \F_t]=Z_t$。那么，$\E[|Z_{t+1}-Z_t|\mid \F_t]=\E[|X_{t+1}+\E[X]|\mid F_t]\leq 2\E[X]$，再结合$\E[T]<\infty$，可知满足OST的第三个条件。因此$\E[Z_T]=\E[Z_0]=0$，也即$\E[\sum\limits_{i=1}^{T}(X_i-\E[X_i])]=0$，根据线性性得到$\E[\sum\limits_{i=1}^{T}X_i]=\E[\sum\limits_{i=1}^{T}\E[X_i]]$ $=\E[X]\E[T]$。

考虑这样一个例子。有$n$个相同的信号源，每个信号源每秒有$1/n$的概率发射信号到一个服务器。服务器每秒钟只能接受一个信号源的信号，如果超过一个信号源发生信号则无效。问期望多少秒以后服务器接收到每个信号源的信号。我们假设服务器接收到每个信号源的信号时总共成功接受过$T$个信号，设成功接受单单第$i$个信号花了$X_i$秒，那么总用时一定等于$\sum\limits_{i=1}^{T}X_i$，我们要计算$\E[\sum\limits_{i=1}^{T}X_i]$。$T$是一个stopping time，因为根据之前的信号我们就能判断出要不要停止。而计算$T$的期望应当是如下累加：$\E[T]=1+\dfrac{1}{(n-1)/n}+\dfrac{1}{(n-1)/n}+\cdots+\dfrac{1}{1/n}$，因为第一个成功的信号不会重复，接下来成功的概率变为$\dfrac{n-1}{n}\cdots$。因此$\E[T]=n(1+\dfrac{1}{2}+\cdots+\dfrac{1}{n})$在$n$确定时是个有限的量。而$\E[X_i]=\dfrac{1}{n}(1-\dfrac{1}{n})^{n-1}\cdot n=(1-\dfrac{1}{n})^{n-1}$。因此也有$\E[X_i]<\infty$。显然$X_i$独立同分布，因此满足了所有Wald's Equation的条件，得到$\E[\sum\limits_{i=1}^{T}X_i]=\E[X]\E[T]$，其中$\E[T]\approx n\log n,\E[X]\approx 1/e$，所以有近似$\E[\sum\limits_{i=1}^{T}X_i]\approx \dfrac{1}{e}n\log n$。

### Proof of OST

下面我们要证明OST。OST要在对应的三个条件下证$\E[X_\tau]=\E[X_0]$，为此我们可以用$\tau$对$X_n$做truncation：$X_\tau=X_{\min\{\tau,n\}}+\mathbb{1}[\tau>n]\cdot (X_\tau-X_n)$

记$Z_n=X_{\min\{n,\tau\}}$，下面我们证明$Z_n$是martingale。（这是个普适的结论）$\E[Z_{n+1}\mid \F_n]=\E[Z_{n+1}\cdot \mathbb{1}[\tau>n]\mid \F_n]+\E[Z_{n+1}\cdot\mathbb{1}[\tau \leq n]\mid \F_n]$。那么根据$Z_n$的定义就等于$\E[X_{n+1}\cdot \mathbb{1}[\tau>n]\mid \F_n]+\E[X_\tau \cdot\mathbb{1}[\tau \leq n]\mid \F_n]$根据stopping time的定义，两个indicator都是$\F_n$可测的，因此可以提出外面得到$\mathbb{1}[\tau>n]\cdot \E[X_{n+1}\mid \F_n]+\mathbb{1}[\tau \leq n]\cdot \E[X_\tau\mid \F_n]$。因为$X_n$是martingale，因此$\E[X_{n+1}\mid \F_n]=X_n$。$\tau \leq n$时$X_\tau$是$\F_n$可测的，因此$\E[X_\tau\mid\F_n]=X_\tau$。因此写出$\mathbb{1}[\tau>n]\cdot X_n+\mathbb{1}[\tau \leq n]\cdot X_\tau$。这等价于$\mathbb{1}[\tau>n]\cdot X_{\min\{n,\tau\}}+$ $\mathbb{1}[\tau \leq n]\cdot X_{\min\{n,\tau\}}$$=X_{\min\{n,\tau\}}=Z_n$。所以$\E[Z_{n+1}\mid\F_n]=Z_n$，因此$Z_n$是martingale。

因此$\forall n$，$\E[Z_n]=\E[Z_0]=\E[X_0]$。而$\E[X_\tau]=\E[Z_n]+\E[\mathbb{1}[\tau>n]\cdot$ $(X_\tau-X_n)]$，因此我们要证的命题变成了$\E[\mathbb{1}[\tau>n]\cdot$ $(X_\tau-X_n)]=0$。我们只需在$n\to\infty$的时候证明这个命题，即证$\lim\limits_{n\to\infty}\E[\mathbb{1}[\tau>n]\cdot(X_\tau-X_n)]=0$​。依次考察三个条件：

① $\tau$ a.s. 有界，也即$\exists M>0,\Pr[\tau\leq M]=1$。当$n>M$时，恒有$\mathbb{1}[\tau>n]\cdot(X_\tau-X_n)=0$，在考虑期望时不需考虑零测集，因此一定有$\E[\mathbb{1}[\tau>n]\cdot(X_\tau-X_n)]=0$对于$n>M$恒成立，也即$\lim\limits_{n\to\infty}\E[\mathbb{1}[\tau>n]\cdot(X_\tau-X_n)]=0$。

② $\Pr[\tau < \infty]=1$且$\exists M$使得$|X_i|\leq M$对任意$i \leq \tau$成立。考虑放缩：$\E[\mathbb{1}[\tau>n]\cdot(X_\tau-X_n)]]\leq \E[\mathbb{1}[\tau>n]\cdot(|X_\tau|+|X_n|]\leq 2M\cdot \E[\mathbb{1}[\tau>n]]$ $=2M\cdot \Pr[\tau>n]$，$n\to\infty$时$\Pr[\tau>n]\to 0$。

③ $\E[\tau]<\infty$且$\exists M$使得$\forall i \in \N$都有$\E[|X_{i+1}-X_i|\mid \F_i]\leq M$。这里我们要$从\E[\mathbb{1}[\tau>n]\cdot(X_\tau-X_n)]$出发构造出$\E[|X_{i+1}-X_i|\mid \F_i]$的形式，为此我们首先做裂项$\E[\sum\limits_{k=n}^{\infty}\left((X_{k+1}-X_k)\cdot \mathbb{1}[\tau>k]\right)]$，容易验证这与$从\E[\mathbb{1}[\tau>n]\cdot(X_\tau-X_n)]$是恒等的。做放缩$\E[\sum\limits_{k=n}^{\infty}\left((X_{k+1}-X_k)\cdot \mathbb{1}[\tau>k]\right)]\leq \E[\sum\limits_{k=n}^{\infty}\left(|X_{k+1}-X_k|\cdot \mathbb{1}[\tau>k]\right)]$后求和的每一项都是非负的，那么根据Monotone Convergence Theorem(MCT，单调收敛定理)可以交换期望和求和，得到$\sum\limits_{k=n}^{\infty}\E[(X_{k+1}-X_k)\cdot \mathbb{1}[\tau>k]]$。接下来是一个重要且常用的技巧，根据条件期望的Tower Rule，我们可以把它写成$\sum\limits_{k=n}^{\infty}\E[\E[(X_{k+1}-X_k)\cdot \mathbb{1}[\tau>k]\mid \F_k]]$。那么因为$\tau$的性质可以提出写作$\sum\limits_{k=n}^{\infty}\E[\mathbb{1}[\tau>k]\cdot \E[(X_{k+1}-X_k)\mid \F_k]]$。这样我们就得到想要的结构了，因此有$\leq \sum\limits_{k=n}^{\infty}\E[\mathbb{1}[\tau>k]\cdot M]=M\cdot \sum\limits_{k=n}^{\infty}\Pr[\tau>k]$。而我们知道$\E[\tau]=	\sum\limits_{k=1}^{\infty} \Pr[\tau > k]$，而条件告知我们$\E[\tau]<\infty$，所以这个级数的tail一定趋向0。也即当$n\to \infty$时，$\sum\limits_{k=n}^{\infty}\Pr[\tau>k]\to 0$。证毕。

## Convergence of Martingale

### Upcrossing Theorem and Convergence Theorem

对于一个Martingale，当样本选定时它就是一个数列$X_0(\omega),X_1(\omega),\cdots$。当我们把它在平面坐标系上标出来并把它们连接成折线图时，对于任意的值域区间$[a,b]$，我们可以讨论这个数列从下往上穿过$[a,b]$的次数(Upcrossing)。严格地，一个数列穿过$[a,b]$的次数可以这样定义：找到第一个$\leq a$的点$X_{\alpha_1}$，在这之后找到第一个$\geq b$的点$X_{\beta_1}$，这就是第一次upcrossing；接着找到接下来的第一个$\leq a$的点$X_{\alpha_2}$，再找下一个$\geq b$的点$X_{\beta_2}$，这就是第二次upcrossing……

记$X_0$到$X_N$中的upcrossing次数为$\nu_N(a,b)$。我们发现所有的$\alpha_i,\beta_i$都是stopping time，因为它们完全由前$n$次$X_i$的信息决定，所以对于任意的$i$都有$\E[X_{\alpha_i}]=\E[X_{\beta_i}]=\E[X_0]$。（用OST的①，因为所有的stopping time都是有界的）于是我们可以用类似裂项的构造得到这样一个结论，称为Upcrossing Theorem：$\E[\nu_N(a,b)]\leq\dfrac{\E[\max\{X_N-a,0\}]}{b-a}$。

Upcrossing Theorem对于sub-martingale也是成立的。我们令$N\to\infty$，那么$\lim\limits_{n\to\infty}\E[\nu_N(a,b)]\leq\dfrac{\lim\limits_{n\to\infty}\E[\max\{X_N-a,0\}]}{b-a}$。而$\nu_N$是非负且单调的，因此根据MCT极限与期望可交换，那么记$\nu_\infty=\lim\limits_{n\to\infty}\nu_N$,就有$\E[\nu_\infty(a,b)]\leq\dfrac{\sup_n \E[\max\{X_n-a,0\}]}{b-a}\leq\dfrac{\sup_n\E[|X_n|]+|a|}{b-a}$。假如$\sup_n\E[|X_n|]<\infty$，那么我们就给出了upcrossing次数的一个上界！也就是说，$X_n$的upcrossing次数是有限的，它意味着数列不会因为无限的摆动而发散。而$\sup_n\E[|X_n|]<\infty$意味着数列不会趋向无穷，所以我们实际上期待$X_n$是“收敛”的！对于sub-martingale，如果$\sup_n\E[|X_n|]<\infty$，那么可以证明存在$X$使得$X_n\stackrel{a.s.}{\to}X$。这称为Martingale Convergence Theorem。

为什么是almost surely收敛呢？考虑使得$X_n(\omega)$发散的样本点$\omega$，此时一定有数列的下极限小于上极限。那么我们一定可以找到位于上下极限之间的两个不同的数$a,b$，$X_n(\omega)$一定穿过了区间$[a,b]$无穷次（不然就与上下极限的定义矛盾）。而Upcrossing Theorem指出穿越次数的期望是有限的，因此所有穿越无数次的样本点$\omega$构成的集合必定是零测集。因此$X_n$在一个测度为1的集合上收敛。

## Martingale and Uniformly Integrable(UI，一致可积)

我们定义过$X_n$以$L_1$收敛到$X$意味着$\lim\limits_{n\to\infty}\E[X_n]=\E[X]$。依概率收敛意味着$\forall \varepsilon>0$，$\lim\limits_{n\to \infty}\Pr[|X_n-X|>\varepsilon]=0$。我们已经知道$X_n\stackrel{L_1}\to X\implies X_n\stackrel{p}\to X$，我们想知道什么时候成立$X_n\stackrel{p}\to X\implies X_n\stackrel{L_1}\to X$。这其实又是一个期望和极限何时可交换的问题，如果记$\lim\limits_{n\to \infty}X_n=X$表示$X_n\stackrel{p}\to X$，那么我们就是在讨论$\E[\lim\limits_{n\to\infty}X_n]=\lim\limits_{n\to\infty}\E[X_n]$的成立条件。这个条件就是$X_n$一致可积。我们的定理表述如下：若$\E[|X_n|],\E[|X|]<\infty$，那么$X_n\stackrel{L_1}\to X \iff (X_n\stackrel{p}\to X \land X_n一致可积)$。（证明略）

其中一致可积就是随机变量在所有样本点上“以相同的速率可积”。可积可以定义为$\lim\limits_{N\to\infty}\displaystyle\int_{|X|>N}|X|dP=0$，表示无穷的样本点积分收敛于0。那么一致可积就可以定义为$\forall\varepsilon>0$，$\exists N>0$使得$\forall \alpha \in I$都有$\lim\limits_{N\to\infty}\displaystyle\int_{|X_\alpha|>N}|X_\alpha|dP\leq \varepsilon$，这样我们就保证了在所有样本点上步调一致。

我们简单地讨论一下一致可积的充分条件，这能帮助我们更好地理解一致可积。首先，$\E[|X_n|]$收敛不能保证一致可积，$X_n=n\cdot \mathbb{1}_{[\frac{1}{n},\frac{2}{n}]}$就是反例。然而我们容易证明只要比一阶矩大一点点的矩收敛就能推出一致收敛。也即对于任何的$p>0$，$\E[|X_n|^{1+p}]$收敛就能推出一致收敛：$\displaystyle\int_{|X_n|>N}|X_n|dP=\int_{|X_n|>N}|X_n|\cdot |X_n|^p\cdot \dfrac{1}{|x_n|^p}dP\leq \int_{|X_n|>N}|X_n|\cdot |X_n|^p\cdot \dfrac{1}{N^p}dP$ $\dfrac{1}{N^p}\displaystyle\int_{|X_n|>N}|X_n|^{1+p}dP\leq \dfrac{1}{N^p}\displaystyle\int|X_n|^{1+p}dP=\dfrac{\E[|X_n|^{1+p}]}{N^{p}}$。因此$\displaystyle\int_{|X_n|>N}|X_n|dP\leq \dfrac{C}{N^p}$，当$N\to\infty$时一致收敛于0。另一个常用的充分条件就是控制收敛定理（DCT）中的条件，因为一旦$X_n$能被一个随机变量$Y$控制且$Y$可积，那么$X_n$的可积速率被$Y$控制，因此一定是一致可积的。

一致收敛并不是一个容易验证的性质。但如果我们已知我们讨论的是martingale，事情就变得容易。对于一列sub-$\sigma$-algebra $G_1\subseteq G_2\subseteq \cdots \subseteq G_n \subseteq \cdots \F$以及随机变量$X$，我们$Y_n=\E[X\mid G_n]$是Doob's Martingale，现在我们能够证明如果$\E[|X|]<\infty$，那么martingale $Y_n$一定一致可积：只需计算$\displaystyle\int_{|Y_n|>N}|Y_n|dP$，代入得$\displaystyle\int_{|Y_n|>N}|\E[X\mid G_n]|dP$，根据Jensen不等式$\leq \displaystyle\int_{|Y_n|>N}\E[|X|\mid G_n]dP$。由于$\mathbb{1}[|Y_n|>N]$是$G_n$可测的，因此在$|Y_n|>N$的样本上$\E[|X|\mid G_n]=|X|$，因此得到$\displaystyle\int_{|Y_n|>N}|X|dP$。由于$|X|$ a.s. 有限，当$\Pr[|Y_n|>N]$足够小时这个积分趋向0，而根据Markov不等式$\Pr[|Y_n|>N]\leq\dfrac{\E[|Y_n|]}{N}=\dfrac{\E[|X|]}{N}$，因此当$N$足够大时我们总能一致地保证它足够小，因此证明了积分能够一致收敛于0。

还可以验证当$X_n$是sub-martingale时，$\{X_n\}$一致可积等价于$\{X_n\} \ L_1$收敛，也等价于存在$X$使得$X_n$ a.s. 收敛到$X$，且$\{X_1,X_2,\cdots,X_n,\cdots,X\}$是sub-martingale。



