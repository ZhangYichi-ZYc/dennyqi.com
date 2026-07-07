## 正态分布

### 正态分布的微分熵

$\newcommand{\d}{\text{ d}}$$\newcommand{\E}{\mathbb{E}}$当$X$满足正态分布$N(\mu,\sigma^2)$时，$f(x)=\dfrac{1}{\sqrt{2\pi\sigma^2}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$。我们以$e$为底数计算$h(X)=-\displaystyle\int_S f(x)\ln f(x)\d  x$，那么$h(X)=-\displaystyle\int_{-\infty}^{+\infty}f(x)\ln\dfrac{1}{\sqrt{2\pi\sigma^2}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}\d x$$=-\displaystyle\int_{-\infty}^{+\infty}f(x)\ln\dfrac{1}{\sqrt{2\pi\sigma^2}}\d x-\displaystyle\int_{-\infty}^{+\infty}f(x)\ln e^{-\frac{(x-\mu)^2}{2\sigma^2}}\d  x$$=-\ln\dfrac{1}{\sqrt{2\pi\sigma^2}}\displaystyle\int_{-\infty}^{+\infty}f(x)\d x+\displaystyle\int_{-\infty}^{+\infty}f(x)\cdot \frac{(x-\mu)^2}{2\sigma^2}\d x$，第一项根据概率密度函数的定义$\displaystyle\int_{-\infty}^{+\infty}f(x)\d  x=1$，第二项中根据方差的定义$\displaystyle\int_{-\infty}^{+\infty}f(x)\cdot {(x-\mu)^2}\d x=\E[(X-\E[X])^2]=\text{Var}(X)=\sigma^2$，于是$h(X)=\dfrac{1}{2}\ln(2\pi\sigma^2)+\dfrac{1}{2}=\dfrac{1}{2}\ln(2\pi e\sigma^2)$。

### 高维正态分布

$\newcommand{\Cov}{\text{Cov}}\newcommand{\Var}{\text{Var}}$对于$n$维随机向量$X=(X_1,\cdots,X_n)$，定义随机向量的期望$\E[X]=(\E[X_1],\cdots,\E[X_n])$。相应的，随机矩阵的期望也定义为每一项的期望形成的矩阵。那么，定义随机向量$X$的协方差(Covariance)矩阵为$\Cov(X)=\E[(X-\E[X])(X-\E[X])^\top]$。对于$i,j\in[n]$，$\Cov(X)_{ij}=\E[(X_i-\E[X_i])(X_j-\E[X_j])]$就称为$X_i,X_j$的协方差。注意到，$\Cov(X)_{ii}=\E[(X_i-\E[X_i])^2=\Var[X_i]$，方差是一个随机变量与自己的协方差。如果$X_i,X_j$独立，那么$\Cov(X)_{ij}$$=\E[X_iX_j]-2\E[X_i]\E[X_j]$$+\E[X_i]\E[X_j]=0$，也即独立随机变量的协方差为0。显然，协方差矩阵是对称的。同时，我们证明协方差矩阵是半正定的：$\forall x\in \R^n$，$x^\top \Cov(X)x=x^\top\E[(X-\E[X])(X-\E[X])^\top]x$$=\E[x^\top(X-\E[X])(X-\E[X])^\top x]=\E[((X-\E[x])^\top x)^2]\geq 0$。

如果存在一个$n\times n$的矩阵$A$以及一个$n$维向量$\mu$满足$X=A\xi+\mu$，其中$\xi=(\xi_1,\cdots,\xi_n)$，$\xi_i\sim N(0,1)$且相互独立，就称$X$满足高维正态分布。下面我们计算一个满足高维正态分布的随机向量$X$的协方差矩阵：$\Cov(X)=\Cov(A\xi+\mu)$$=\E[(A\xi+\mu-\E[A\xi+\mu])(A\xi+\mu-\E[A\xi+\mu])^\top]$$=\E[(A\xi-\E[A\xi])(A\xi-\E[A\xi])^\top]$，而$\E[\xi]=0$，那么$\Cov(X)=\E[(A\xi)(A\xi)^\top]=A\E[\xi\xi^\top]A^\top$。$\forall i\neq j$，$\E[\xi_i\xi_j]=\E[\xi_i]\E[\xi_j]=0$；$\E[\xi_i^2]=\E[\xi_i^2]-\E[\xi_i]^2=\Var[\xi_i]=0$，因此$\E[\xi\xi^\top]=I$，因此$\Cov(X)=AA^\top$。可见，高维正态分布的协方差矩阵由$A$描述，我们把$AA^\top$记为$K$。

在概率论中我们证明了高维正态分布有density $f(x)=\dfrac{1}{(2\pi)^{\frac{n}{2}}|K|^\frac{1}{2}}e^{-\frac{1}{2}(x-\mu)^\top K^{-1}(x-\mu)}$（见[雷神笔记 Lecture17](https://notes.sjtu.edu.cn/s/I2UoS2j1U)），可见$n$维正态分布只与$\mu,K$有关，记为$X\sim \mathcal{N}(\mu,K)$。此时可以计算化简得到$h(f)=-\displaystyle\int_{\R^n}f(x)\ln f(x)\d x=\dfrac{1}{2}\ln [(2\pi e)^n\cdot |K|]$。

### 正态分布的最大熵性质

正态分布是一种如此特殊的分布：当满足随机变量给定期望和方差时，当且仅当它满足正态分布时微分熵最大。在中心极限定理中我们也能隐约感受到这一点，因为任何分布重复累加后都会趋向正态分布，这说明正态分布总能对应所有的可能性，也就是最大的不确定性。严格地，我们要证明对于任意随机变量$X$，若$\E[X]=\mu,\Var[X]=\sigma^2$，则$h(X)\leq \dfrac{1}{2}\ln(2\pi e\sigma^2)$，当且仅当$X\sim N(\mu,\sigma^2)$时取到等号。

我们用相对熵的非负性来证明这一点。对任意满足要求的$X$，取$X_G\sim N(\mu,\sigma^2)$。那么成立$D(f_X||f_{X_g})\geq 0$，也即$\displaystyle\int_{\R}f_X(x)\ln \dfrac{f_X(x)}{f_{X_g}(x)}\d x\geq 0$。那么$\displaystyle\int_{\R}f_X(x)\ln f_X(x)\d x\geq \displaystyle\int_{\R}f_X(x)\ln f_{X_g}(x)$，代入得到$-h(f)\geq \displaystyle\int_{\R}f_X(x)\ln \left(\dfrac{1}{\sqrt{2\pi\sigma^2}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}\right)\d x$$=\ln\dfrac{1}{\sqrt{2\pi\sigma^2}}-\displaystyle\int_{\R}f_X(x)\cdot \frac{(x-\mu)^2}{2\sigma^2}\d x$$=-\dfrac{1}{2}\ln(2\pi\sigma^2)-\dfrac{1}{2}$。整理得$h(f)\leq \dfrac{1}{2}\ln(2\pi e\sigma^2)$。注意到$f_X=f_{X_g}$时取到等号，也即$X\sim N(\mu,\sigma^2)$。

## 高斯信道(Gaussian Channel)

应用最广泛的连续信道是高斯信道。在这里，输入信息允许被编码成连续的随机变量$X$。在这个模型下，我们假定$X$以“叠加”的方式受到一个噪声$Z$，$Z$满足正态分布$\mathcal{N}(0,N)$，输出$Y=X+Z$。其中，$X$与$Z$独立。

由于$Z$的分布随指数递减，大部分的density都集中在$0$附近。所以如果我们能够任意选择$X$的编码方式，我们完全可以把所有信息都编码在原理$0$的位置，这样噪声就几乎不能对信源造成影响。但在实际中$X$的编码是有代价的，$X$的编码越偏离$0$点所需的代价越高。因此在信息论中，我们定义高斯信道的能量限制(Energy Constraint)：我们规定$X$的二阶矩不能超过常数$P$，也即添加额外限制$\E[X^2]\leq P$。那么高斯信道的容量写作$C=\max\limits_{f(x):\E[X^2]\leq P}I(X;Y)$。

高斯信道的容量可以化简为只关于方差$N$与能量限制$P$的表达式。注意到由于$Y$是由$X+Z$定义的，$I(X;Y)=h(Y)-h(Y\mid X)=h(Y)-h(X+Z\mid X)$$=h(Y)-h(Z\mid X)=h(Y)-h(Z)$，其中$h(Z)$已知等于$\dfrac{1}{2}\ln(2\pi eN)$。而$\Var[Y]=\E[Y^2]-\E[Y]^2\leq \E[Y^2]=\E[(X+Z)^2]$$=\E[X^2]+2\E[X]\E[Z]+\E[Z^2]$$=\E[X^2]+0+\Var[Z]=\E[X^2]+N\leq P+N$。根据最大熵原则，$h(Y)\leq \dfrac{1}{2}\ln(2\pi e\Var[Y])\leq \dfrac{1}{2}\ln(2\pi e(P+N))$。综上，$I(X;Y)\leq \dfrac{1}{2}\ln(2\pi e(P+N))-\dfrac{1}{2}\ln(2\pi eN)=\dfrac{1}{2}\ln\left(1+\dfrac{P}{N}\right)$。而当$X\sim \mathcal{N}(0,P)$时等号成立，因此$C=\dfrac{1}{2}\ln\left(1+\dfrac{P}{N}\right)$。这就是高斯信道容量的一般表达式。

为什么我们总是假设噪声满足正态分布呢？Shannon证明了，在所有以叠加方式产生干扰的噪声$Z$中，如果方差给定，那么正态分布一定是使得信道容量最小的噪声——正态分布产生的干扰是最强的。严格地，可以证明$\min\limits_{\E[Z^2]\leq N}\max\limits_{\E[X^2]\leq P}I(X;X+Z)=\max\limits_{\E[X^2]\leq P}I(X;X+Z),Z\sim \mathcal N(0,N)$。











