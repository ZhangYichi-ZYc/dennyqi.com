## Fourier变换及其逆变换

在我们已经讨论过的Fourier级数中，我们能够取三角函数的一个周期$[-\pi,\pi]$对任何周期为$2\pi$的函数做Fourier展开。现在假设函数的周期不是$2\pi$而是一般地具有<u>有限</u>周期$2T$，那么很自然地我们可以对三角函数做伸缩，用$\sin \dfrac{\pi}{T}x$和$\cos \dfrac{\pi}{T}x$的三角级数做展开，得到：$f_T(x)\sim\dfrac{a_0}{2}+\sum\limits_{n=1}^{\infty}\left[a_n\cos\left(\dfrac{n\pi}{T}x\right)+b_n\sin\left(\dfrac{n\pi}{T}x\right)\right]$。其中，$a_n=\dfrac{1}{T}\displaystyle\int_{-T}^{T}f_T(x)\cos \left(\dfrac{n\pi}{T}x\right)dx$，$b_n=\dfrac{1}{T}\displaystyle\int_{-T}^{T}f_T(x)\sin \left(\dfrac{n\pi}{T}x\right)dx$。而对于非周期函数，我们总可以选定一段定义域区间$[-T,T]$而抛弃其余的部分，取而代之选定区间的部分从而把它“延拓”为周期函数，而对于周期函数我们可以写出其Fourier级数，这之后再令$T\to +\infty$就可以得到一般非周期函数的Fourier展开。

我们常常用复指数来表示三角函数，这样会得到更简洁的形式。由欧拉公式有$\cos\theta=\dfrac{e^{i\theta}+e^{-i\theta}}{2}$，$\sin\theta=\dfrac{e^{i\theta}-e^{-i\theta}}{2i}=-\dfrac{i}{2}(e^{i\theta}-e^{-i\theta})$。记$\dfrac{\pi}{T}=\omega$，得到$f_T(x)\sim \dfrac{a_0}{2}+\sum\limits_{n=1}^{\infty}(a_n \cdot \dfrac{e^{in\omega x}+e^{-in\omega x}}{2}-ib_n \cdot \dfrac{e^{in\omega x}-e^{-in\omega x}}{2})$$=\dfrac{a_0}{2}+\sum\limits_{n=1}^{\infty}\left(\dfrac{a_n-ib_n}{2}e^{in\omega x}+\dfrac{a_n+ib_n}{2}e^{-in\omega x}\right)$。记$a_n-ib_n=c_n$，则$a_n+ib_n=\overline{c_n}$。代入$a_n,b_n$的表达式，得到$c_n=\dfrac{1}{T}\displaystyle\int_{-T}^{T}f_T(x)\left[\cos \left(\dfrac{n\pi}{T}x\right)-i\sin\left(\dfrac{n\pi}{T}x\right)\right]dx=\dfrac{1}{T}\displaystyle\int_{-T}^{T}f_T(x)e^{-in\omega x}dx$。那么现在整个Fourier级数可以写成$f_T(x)\sim \dfrac{a_0}{2}+\dfrac{1}{2}\sum\limits_{n=1}^{\infty}(c_n e^{in\omega x}+\overline{c_n}e^{-in\omega x})$。为了写法上的方便，我们记$\overline{c_n}=c_{-n}$，同时$c_0=a_0$。那么写出$f_T(x)\sim \dfrac{1}{2}\sum\limits_{n=-\infty}^{+\infty}c_n e^{in\omega x}$，这就是Fourier级数的复数形式。

代入$c_n$，得到$f_T(x)\sim \dfrac{1}{2T}\sum\limits_{n=-\infty}^{+\infty}\left[\displaystyle\int_{-T}^{T}f_T(x)e^{-in\omega x}dx\right]e^{in\omega t}$。现在令$T\to +\infty$。代入$T=\dfrac{\pi}{\omega}$，那么$\omega \to 0$。得到$f_\infty(x)\sim \lim\limits_{\omega \to 0}\dfrac{\omega}{2\pi}\sum\limits_{n=-\infty}^{+\infty}\left[\displaystyle\int_{-T}^{+T}f_T(x)e^{-in\omega x}dx\right]e^{in\omega t}$，而求和的部分形如Riemann和的形式，因此在形式上对一般的函数$f$可以写出$f(x)\sim \dfrac{1}{2\pi}\displaystyle\int_{-\infty}^{+\infty}\left[\displaystyle\int_{-\infty}^{+\infty}f(x)e^{-i\omega x}dx\right]e^{i\omega t}d\omega$。可以观察到，内层的积分和外层的积分有着非常相似的形式，内层积分对于每个$\omega$都得到一个值，形成了一个关于“频率”$\omega$的函数，这个函数在外层积分的作用后又会恢复到$f$本身。从一个函数到另一个函数的过程就是“变换”(transform)，我们定义函数$\hat f(\omega)=\displaystyle\int_{-\infty}^{+\infty}f(x)e^{-i\omega x}dx$为$f$的Fourier变换，记为$F[f](\omega)$。定义$\dfrac{1}{2\pi}\displaystyle\int_{-\infty}^{+\infty}\hat f(\omega)e^{i\omega x}d\omega$为Fourier变换的逆变换，记为$F^{-1}[\hat f](x)$。在一定的条件下，可以认为$f(x)=F^{-1}[F[f]]$，其中$F^{-1}[F[f]]=\dfrac{1}{2\pi}\displaystyle\int_{-\infty}^{+\infty}\left[\displaystyle\int_{-\infty}^{+\infty}f(x)e^{-i\omega x}dx\right]e^{i\omega t}d\omega$就称为Fourier积分。可以证明（略）如下充分条件：如果$f$在$(-\infty,+\infty)$上绝对可积且在任何闭区间上分段可导，那么$f$的Fourier积分等于$f$本身。

## Fourier变换的性质

根据定义$F[f](\omega)=\displaystyle\int_{-\infty}^{+\infty}f(x)e^{-i\omega x}dx$，可以证明Fourier变换（以及逆变换$F^{-1}[\hat f]=\dfrac{1}{2\pi}\displaystyle\int_{-\infty}^{+\infty}\hat f(\omega)e^{i\omega x}d\omega$）具有如下性质：

①线性性：$F[c_1 f+c_2g](\omega)=c_1F[f](\omega)+c_2F[g](\omega)$；$F^{-1}[c_1\hat f+c_2 \hat g](x)=c_1F^{-1}[\hat f](x)+c_2F^{-1}[\hat g](x)$。这本质上就是积分的线性性。

②平移性质：$F[f(x\pm x_0)](\omega)=F[f(x)](\omega) \cdot e^{\pm i\omega x_0}$；$F^{-1}[\hat f(\omega\pm \omega_0)](x)=F^{-1}[\hat f(\omega)](x) \cdot e^{\mp i\omega_0 x}$。$e^{i\omega x}$一项是积分的换元法产生的结果。

③伸缩性质：$F[f(ax)](\omega)=\dfrac{1}{|a|}F[f(x)]\left(\dfrac{\omega}{a}\right)$；$F\left[\dfrac{1}{a}f\left(\dfrac{x}{a}\right)\right](\omega)=F[f(x)]\left(a\omega\right)$。这本质上也是积分的换元法。

④微分性质：若$\lim\limits_{x\to\infty}f(x)=0$且$f,f'$绝对可积，则$F[f'](\omega)=i\omega \cdot F[f](\omega)$；若$f,xf$绝对可积，则$F[-ix \cdot f](\omega)=[F[f]]'(\omega)$。这本质上是分部积分法。

⑤卷积的Fourier变换：$f,g$的卷积定义为$(f*g)(x)=\displaystyle\int_{-\infty}^{+\infty}f(t)g(x-t)dt$。若$f,g$绝对可积，则$F[f*g]=F[f]\cdot F[g]$。也就是说：卷积的Fourier变换等于各自Fourier变换的乘积。

⑥Parseval等式：$\displaystyle\int_{-\infty}^{+\infty}[f(x)]^2dx=\dfrac{1}{2\pi}\int_{-\infty}^{+\infty}|\hat f(\omega)|^2d\omega$

## 离散Fourier变换

用离散的求和来近似Fourier变换，我们在$f(x)$上选取$N$个点$x_0,\cdots,x_{N-1}$，我们称以下变换为离散Fourier变换：$D[x](j)=X(j)=\sum\limits_{n=0}^{N-1}x_ne^{-2\pi ij \frac{n}{N}}$。我们选取的离散形式下基$e^{-2\pi i\frac{n}{N}\cdot k}$是内积$\sum ()()$意义下的正交基：$\dfrac{1}{N}\sum\limits_{n=0}^{N-1}e^{-2\pi i\frac{nj}{N}}e^{-2\pi i\frac{nk}{N}}=\delta_{j,k}$。由此可以验证离散Fourier逆变换$D^{-1}[X](k)=\dfrac{1}{N}\sum\limits_{j=0}^{N-1}X(j)e^{2\pi i\frac{jk}{N}}$满足：$\dfrac{1}{N}\sum\limits_{j=0}^{N-1}X(j)e^{2\pi i\frac{jk}{N}}$$=\dfrac{1}{N}\sum\limits_{j=0}^{N-1}\sum\limits_{n=0}^{N-1}x_ne^{-2\pi ij \frac{n}{N}}e^{2\pi i\frac{jk}{N}}$$=\sum\limits_{n=0}^{N-1}x_n\sum\limits_{j=0}^{N-1}\left[\dfrac{1}{N}e^{-2\pi ij \frac{n}{N}}e^{2\pi i\frac{jk}{N}}\right]$$=\sum\limits_{n=0}^{N-1}x_n\delta_{n,k}=x_k$。

Fourier变换有这样的性质，如果被变换的函数本身是由几个基频的三角函数叠加而成，那么变换后的函数只会在基频附近得到一个模长较大的峰。由此可以对任意函数做谱的分解。在数字信号传输中，如果应用离散Fourier变换，我们只需关注模长较大的那些$X_j$就可以基本正确地还原出原始数据，这使得信号传输的效率大大提高。同时，1960年代人们也发现了$O(n\log n)$完成离散Fourier变换计算的方法，称为快速Fourier变换（FFT），见算法课的笔记[[分治]](https://www.cnblogs.com/qixingzhi/p/17207353.html)。

