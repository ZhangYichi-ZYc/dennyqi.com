## Brownian Motion
### Wiener Process

$\newcommand{\E}{\mathbb{E}}\newcommand{\Var}{\text{Var}}$我们熟悉作为离散随机过程的“随机游走”。这指的是：给定一列自然数下标的i.i.d.随机变量$X_t$，其中$X_t$有$1/2$概率取$\delta$，$1/2$概率取$-\delta$。令$Z_0=0$，$Z_T=\sum\limits_{t=1}^{T}X_t$。那么$Z_T$就描述了随机游走过程的位置变化。

我们可以把上面的“随机游走”模型想象成是“每隔一秒运动$\delta$”。如果我们缩短每两次运动的时间间隔，以至于时间间隔趋向无穷小时，我们就会得到一个连续的随机游走。这就是物理中的“布朗运动”模型。为此，我们需要一个连续随机过程的数学模型。

让我们从离散随机过程出发自然地导出连续的版本。我们保持$\{X_t\}$的定义不变，但将其含义修改为“每隔$\Delta t$秒运动$\delta$”，相应地把$Z_T$的定义修改为$Z_T=\sum\limits_{t=1}^{T/\Delta t}X_{t}$，表示时刻$T$时的位置的随机变量。让我们来计算$Z_T$的期望与方差：$\E[Z_T]=\E\left[\sum\limits_{t=1}^{T/\Delta t}X_{t}\right]=\sum\limits_{t=1}^{T/\Delta t}\E[X_{t}]=0$；$\Var[Z_T]=\sum\limits_{t=1}^{T/\Delta t}\delta^2=\dfrac{T\delta^2}{\Delta t}$。注意到，如果取$\delta = \sqrt{\Delta t}$，那么就有$\Var[Z_T]=T$。以上性质在$\Delta\to 0$时也成立，而此时由中心极限定理$Z_T$收敛为一个正态分布。由此可得$Z_T\sim \mathcal{N}(0,T)$。可见，布朗运动的位置函数遵循一个方差正比于时间的正态分布。

基于以上观察，数学家Nobert Wiener定义了以下数学模型，被称为“Wiener过程”。给定一个样本空间$\Omega$（所有可能的运动情况），函数$W:\Omega\times \mathbb{R}\to \mathbb{R}$记为$\{W(t)\}_{t\geq 0}$，它给出了一个“连续的随机过程”。称$W(t)$为一个Wiener Process，如果它满足以下四个条件：

- ① $W(t)$在$\Omega$的一个概率测度为$1$子集上连续（简称 almost surely 连续）；
- ② Independent increments: $\forall 0\leq t_0\leq t_1\leq \cdots \leq t_n$，$W(t_1)-W(t_0)$，$W(t_2)-W(t_1)$，...，$W(t_n)-W(t_{n-1})$互相独立；
- ③ Stationary increments: $\forall s,t>0,W(s+t)-W(s)\sim \mathcal{N}(0,t)$；
- ④ $W(0)=0$；

Wiener过程也称为“标准布朗运动”过程。此时，通常会把$W(t)$记为$B_t$。条件一保证了布朗运动的轨迹是连续的曲线；条件二保证了布朗运动在时序上的独立性；条件三保证了布朗运动在时序上的同分布性，并且其分布与我们之前所作的推导相吻合。

### The Hitting Time

对于$b>0$，我们用$\tau_b$表示标准布朗运动第一次到达位置$b$的时刻（一个随机变量）。利用下确界的刻画，我们可以把$\tau_b$定义为$\tau_b:=\inf\{t\mid B_t>b\}$。我们来计算$\tau_b$的累积分布函数$\Pr[\tau_b<t]$。

对于任意给定的$t$，我们可以对$B_t>b$做分类讨论，得到

$$
\begin{aligned}
\Pr[\tau_b<t]&=\Pr[\tau_b<t\land B_t>b]+\Pr[\tau_b<t\land B_t<b]\\
&=\Pr[B_t>b]+\Pr[ B_t<b\mid\tau_b<t]\cdot\Pr[\tau_b<t]
\end{aligned}
$$
因此

$$
\Pr[\tau_b<t]=\dfrac{\Pr[B_t>b]}{1-\Pr[B_t<b\mid \tau_b<t]}
$$

下面计算$\Pr[B_t>b]$。因为$B_t\sim \mathcal{N}(0,t)$，所以$\dfrac{B_t}{\sqrt{t}}\sim\mathcal{N}(0,1)$。记$\mathcal{N}(0,1)$的累计分布函数为$\Phi$。那么$\Pr[B_t>b]=\Pr\left[\dfrac{B_t}{\sqrt{t}}>\dfrac{b}{\sqrt{t}}\right]=1-\Phi\left(\dfrac{b}{\sqrt{t}}\right)$。

下面计算$\Pr[B_t<b\mid \tau_b<t]$。已知$\tau_b<t$时，我们可以将$\tau_b$时刻之后的运动看作$\tau_b$时刻从$b$出发的布朗运动。此时，$B_t<b$当且仅当“从$b$出发，经过$t-\tau_b$秒后，位置落在$b$左侧”。由于布朗运动的对称性，该事件的概率为$1/2$。因此$\Pr[B_t<b\mid \tau_b<t]=1/2$。

综上可得$\Pr[\tau_b<t]=\dfrac{1}{2}-\dfrac{1}{2}\Phi\left(\dfrac{b}{\sqrt{t}}\right)$。

## Itô Calculus

### Itô Integral

$\newcommand{\d}{\text{ d}}$对于像布朗运动这样的process，我们更喜欢locally地描述它。比如，我们更喜欢将其描述为$B_{t+h}=B_t+\xi(t,h),\xi(t,h)\sim \mathcal{N}(0,h)$。再比如，我们很熟悉的梯度下降是一个确定性的运动过程，当我们locally地描述它时，我们会写状态转移方程：$X_{t+1}=X_{t}-\eta \nabla f(X_t)$。如果梯度下降的每一步都带有一点白噪声，它就变成了随机过程：$X_{t+1}=X_{t}-\eta \nabla f(X_t)+\xi(t)$，$\xi_t\sim \mathcal{N}(0,\sigma^2(t,X_t)\eta)$。这通常称为一个朗之万过程(Langevin Dynamics)。

我们知道，对于梯度下降算法，我们可以用“梯度流(gradient flow)”来做“连续化”，也即用微分方程来描述离散的状态转移。例如，对于梯度流，其微分方程为$\d X_{t}=-\eta\nabla f(X_t)\d t$。对于朗之万过程，我们也想用微分方程来描述。白噪声就可以看作是布朗运动的叠加，也即$\xi(t)=\sigma(t,X_t)(B_{t+\eta}-B_t)$，所以我们希望用微分方程$\d X_{t}=-\eta \nabla f(X_t)\d t+\sigma(t,X_t)\d B_t$来描述朗之万过程。对于标准布朗运动，就用$\d X_t=\d B_t$来描述。

于是，我们想要研究以下一般形式的微分方程所刻画的随机过程：

$$
\d X_{t}=\mu(t,X_t)\d t+\sigma(t,X_t)\d B_t
$$

注意，这里的$\d$ 只是形式上的记号。其含义是：

$$
\forall \omega\in\Omega, X_{t+h}(\omega)-X_t(\omega)=\mu(t,X_t(\omega))\cdot h+\sigma(t,X_t(\omega))\cdot (B_{t+h}(\omega)-B_t(\omega))
$$

基于这个微分方程，我们希望它能像一般的常微分方程那样两边同时做积分，使得成立：
$$
\forall T,X_T-X_0=\displaystyle\int_{0}^{T}\mu(t,X_t)\d t+\displaystyle\int_{0}^{T}\sigma(t,X_t)\d B_t
$$
其中，$\displaystyle\int_{0}^{T}\mu(t,X_t)\d t$就可以看作普通的Riemann积分（在每个样本点上），$\displaystyle\int_{0}^{T}\sigma(t,X_t)\d B_t$这一项应当看作Riemann-Stieltjes积分（在每个样本点上）。Riemann-Stieltjes积分在函数性质非常良好时可以看作是Riemann积分应用了换元法。然而，换元法的依据是$\d B_t(\omega)=B_t'(\omega)\d t$，但是$B_t'(\omega)$是不可导的——布朗运动在每个时刻的方向选择可以完全不同。所以我们不能将其看作Riemann积分或Riemann-Stieltjes积分。让我们从定义出发理解它。仿照黎曼积分的定义，我们对$[0,T]$做任意分划$\{[t_{i},t_{t+1}]\}$，且最大区间的长度为$\Delta$，想要将其定义为：
$$
\displaystyle\int_{0}^{T}\sigma(t,X_t)\d B_t:=\lim\limits_{\Delta\to 0}\sum\limits_{i=0}^{n-1}\sigma(t_{i},X_{t_i})(B_{t_{i+1}}-B_{t_i})
$$
一般的，我们想要定义：
$$
\displaystyle\int_{0}^{T}W_t\d B_t=\lim\limits_{\Delta\to 0}\sum\limits_{i=0}^{n-1}W_{t_i}(B_{t_{i+1}}-B_{t_i})
$$
我们将要定义的这一积分称为Itô Integral，其结果是一个随机变量。直觉上，我们希望此处的$\lim$是关于样本点$\omega$逐点收敛的。但数学上我们发现这样定义并不好。Itô Calculus理论在这里将其定义为随机变量的$L^2$收敛（这要求$W$的性质足够好）。我们不严格介绍这套理论，而是以一个特殊的例子来理解为什么要这样做：

考虑$\displaystyle\int_{0}^{T}B_t\d B_t$，根据我们想做的定义，它等于$\lim\limits_{\Delta\to 0}\sum\limits_{i=0}^{n-1}B_{t_i}[[推荐信草稿_cao_english]](B_{t_{i+1}}-B_{t_i})$。其中，$B_{t_i}(B_{t_{i+1}}-B_{t_i})=\dfrac{1}{2}\left(-(B_{t_{i+1}}-B_{t_i})^2+B_{t_{i+1}}^2-B_{t_i}^2\right)$，所以等于$-\dfrac{1}{2}\lim\limits_{\Delta\to 0}\sum\limits_{i=0}^{n-1}(B_{t_{i+1}}-B_{t_i})^2+\dfrac{1}{2}\lim\limits_{\Delta\to 0}\sum\limits_{i=0}^{n-1}(B_{t_{i+1}}^2-B_{t_i}^2)$，其中后者等于$\dfrac{1}{2}(B_T^2-B_0^2)=\dfrac{1}{2}B_T^2$。如果实分析中的积分理论对于随机变量也成立，那么就应当有$\displaystyle\int_{0}^{T}B_t\d B_t=\dfrac{1}{2}B_T^2$，也就要求$\lim\limits_{\Delta\to 0}\sum\limits_{i=0}^{n-1}(B_{t_{i+1}}-B_{t_i})^2=0$。真的是这样吗？让我们来计算$Q_n:=\sum\limits_{i=0}^{n-1}(B_{t_{i+1}}-B_{t_i})^2$这一项的期望和方差：

$\E[Q_n]=\sum\limits_{i=0}^{n-1}\E[(B_{t_{i+1}}-B_{t_i})^2]$，因为$B_{t_{i+1}}-B_{t_i}\sim\mathcal{N}(0,t_{i+1}-t_i)$，所以$\E[(B_{t_{i+1}}-B_{t_i})^2]=t_{i+1}-t_i$，因此$\E[Q_n]=T$；

$\Var[Q_n]=\sum\limits_{i=0}^{n-1}\Var[(B_{t_{i+1}}-B_{t_i})^2]=\sum\limits_{i=0}^{n-1}(\E[(B_{t_{i+1}}-B_{t_i})^4]-\E[(B_{t_{i+1}}-B_{t_i})^2]^2)$。若$X\sim \mathcal{N}(0,\sigma^2)$，由正态分布的定义计算可得$\E[X^4]=3\sigma^4$。因此$\Var[Q_n]=\sum\limits_{i=0}^{n-1}(3(t_{i+1}-t_i)^2-(t_{i+1}-t_i)^2)=2\sum\limits_{i=0}^{n-1}(t_{i+1}-t_i)^2\leq 2\Delta\sum\limits_{i=0}^{n-1}(t_{i+1}-t_i)=2T\Delta$。因此当$\Delta\to 0$时，$\Var[Q_n]\to 0$。

由此可见，在合适的收敛定义下，应当有$\lim\limits_{\Delta\to 0}\sum\limits_{i=0}^{n-1}(B_{t_{i+1}}-B_{t_i})^2=T$。而这一收敛形式就是我们在测度论中定义的$L^2$收敛，因为$\E[(Q_n-T)^2]=\E[Q_n^2]-2T\E[Q_n]+T^2=\Var[Q_n]+\E[Q_n]^2-2T^2+T^2=\Var[Q_n]\to 0$。

综上，我们定义Itô Integral $\displaystyle\int_{0}^{T}W_t\d B_t$为随机变量列的极限$\lim\limits_{\Delta\to 0}\sum\limits_{i=0}^{n-1}W_{t_i}(B_{t_{i+1}}-B_{t_i})$，该极限就是$L^2$收敛意义下的极限。

### Itô Formula

$\lim\limits_{\Delta\to 0}\sum\limits_{i=0}^{n-1}(B_{t_{i+1}}-B_{t_i})^2=T$这一结论如果被写为积分形式，就有$\displaystyle\int_0^T (\d B_t)^2=T$。同时我们又有$\displaystyle\int_0^T \d t=T$。所以我们觉得应该成立
$$
(\d B_t)^2=\d t
$$
基于这一观察，我们可以推导Itô积分的链式法则，帮助我们做计算。这一法则在严格的随机微积分理论中可以被证明：

假设$\d X_t=\mu_t\d t+\sigma_t\d B_t$，对于函数$f$，我们来分析$\d f(X_t)=f(X_t+\d X_t)-f(X_t)$的一阶小量。由泰勒展开可得$f(X_t+\d X_t)-f(X_t)=f'(X_t)\d X_t+\dfrac{1}{2}f''(X_t)(\d X_t)^2+o((\d X_t)^2)$。代入$\d X_t=\mu_t\d t+\sigma_t\d B_t$，得到$f'(X_t)(\mu_t\d t+\sigma_t\d B_t)+\dfrac{1}{2}f''(X_t)(\mu_t\d t+\sigma_t\d B_t)^2+o((\d X_t)^2)$。由此可见，在Itô Calculus中我们不能直接在表层套用泰勒展开来获得一阶项，因为二阶小量$(\d B_t)^2=\d t$，所以二阶项会对一阶小量做出贡献。带入$(\d B_t)^2=\d t$。我们可以化简得到：
$$
\d f(X_t)=\left(f'(X_t)\mu_t+\dfrac{1}{2}f''(X_t)\sigma_t^2\right)\d t+f'(X_t)\sigma_t \d B_t
$$
这就是Itô Calculus下的链式法则，称为Itô Formula。

如果$f$作为一个多元函数（不仅仅是关于$X_t$）的，那么我们必须结合多元函数微分的法则来分析，不能直接套用Itô Formula。作为一个例子，让我们来计算著名的Ornstein-Uhlenbeck Process的位置函数，它满足随机微分方程$\d X_t=-X_t\d t+2\d B_t$，$X_0=0$。首先，令$f(t,X_t)=e^t\cdot X_t$，我们来计算$\d f(t,X_t)$。和上文相同，我们代入多元泰勒公式展开到二阶：（符号上，我们把$f$看作关于$t,x$的二元函数）
$$
\d f = \frac{\partial f}{\partial t}\d t + \frac{\partial f}{\partial x}\d X_t + \frac{1}{2}\frac{\partial^2 f}{\partial x^2}(\d X_t)^2+\frac{1}{2}\frac{\partial^2 f}{\partial t^2}(\d t)^2+\dfrac{\partial^2 f}{\partial t\partial x}(\d t\d X_t)+o(...)
$$

保留所有一阶项，就会化简得到
$$
\d f=2e^t\d B_t
$$
这意味着$e^TX_T=\displaystyle\int_0^T 2e^t \d B_t$，因此$X_T=e^{-T}\displaystyle\int_0^T 2e^t \d B_t$。其中，我们计算 Itô Integral$\displaystyle\int_0^T 2e^t \d B_t$，它是极限和$2\lim\limits_{\Delta\to 0}\sum\limits_{i=0}^{n-1}e_{t_i}(B_{t_{i+1}}-B_{t_i})$。因为$B_{t_{i+1}}-B_{t_i}$满足正态分布，而正态分布的和依然是正态分布，所以我们得知$X_T$也满足正态分布。这一点在$\Delta \to 0$时依然成立。因此要确定$X_T$的分布，只需确定其期望和方差。其中，期望显然为$0$；$\Var[2\sum\limits_{i=0}^{n-1}e_{t_i}(B_{t_{i+1}}-B_{t_i})]$$=4\sum\limits_{i=0}^{n-1}e_{t_i}^2\Var[(B_{t_{i+1}}-B_{t_i})]=4\sum\limits_{i=0}^{n-1}e_{t_i}^2(t_{i+1}-t_i)$。因此再将其写为积分形式，得到$\Var[X_T]=4\displaystyle\int_0^T e^{2t}\d t$。

所以最终我们得到$X_T\sim \mathcal{N}(0,4\displaystyle\int_0^T e^{2t}\d t)$。这就是Ornstein-Uhlenbeck Process的一般结果。直观上，$\d X_t=-X_t\d t+2\d B_t$表示粒子在距离远点越远的地方，就会获得一个越强的回复运动，叠加上一个布朗运动表示的白噪音。上面的计算告诉我们，这一运动过程产生的位置分布恰好是正态分布。


