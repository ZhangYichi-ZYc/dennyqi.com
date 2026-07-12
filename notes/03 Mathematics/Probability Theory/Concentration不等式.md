### Concentration不等式

$\newcommand{\E }{\mathbb{E}}$ $\newcommand{\Var}{\text{Var}}$怎么样才算了解了一个随机变量的全部信息了呢？显然，只要能够得到一个随机变量的分布，就相当于得知了关于这个随机变量的所有信息，因为这意味着我们已经精确的知道这个随机变量有多大的概率取这个值，多大的概率取那个值。然而很多时候，我们不想或者无法精确知道关于某个随机变量的所有信息（也就是无法获得分布的函数），而只知道部分信息。这时候我们也能对随机变量做出一些估计，只不过因为信息不完全，我们的估计也无法做到完全精确。

### Markov不等式

最重要的关于随机变量的信息是期望，它指明随机变量的“平均值”。下面我们想说，期望除了可以用来估计随机变量的平均值，还可以用来估计随机变量大于某个值的概率。我们有Markov不等式：对于非负的随机变量$X$以及非负的实数$a$，成立$\Pr[X\geq a]\leq \dfrac{\E [X]}{a}$。证明如下：$a\Pr[X\geq a]= a\displaystyle\int_{X \geq a}dP \leq$ $\displaystyle\int_{X \geq a}XdP \leq$$\displaystyle\int_{X\geq 0}XdP=\E [X]$，证毕。其中，随机变量大于某个值的概率$\Pr[X \geq a]$被称为随机变量的tail，它是概率密度从$a$到无穷的积分。Markov不等式告诉我们，一个正随机变量的tail能被一个正比于期望的值bound住。

### Chebyshev不等式

随机变量的另一个重要信息是方差，定义为$\Var(X)=\E[(X-\E[X])^2]$或$\Var(X)=\E[X^2]-\E[X]^2$。方差的含义可以Chebyshev不等式解释清楚，这本质是把二次函数应用到Markov不等式上：对于随机变量$X$（不一定非负）以及非负的实数$a$，有

$$
\Pr[|X-\E [X]|\geq a]\leq \dfrac{\Var(X)} {a^2}
$$

证明：$\Pr[|X-\E [X]|\geq a]=$ $\Pr[(X-\E [X])^2\geq a^2]$，随机变量$(X-\E [X])^2$非负，由Markov不等式可得$\Pr[(X-\E [X])^2\geq a^2]\leq \dfrac{\E [(X-\E [X])^2]}{a^2}=\dfrac{\Var(X) }{a^2}$，证毕。其中，随机变量分布于期望两边距离$a$以上的概率总和$\Pr[|X-\E[X]|\geq a]$也可以看作tail。Chebyshev不等式告诉我们，这个tail能被一个正比于方差的值bound住。方差越小，tail就越小，随机变量的分布就越集中在期望附近。可见方差可以衡量随机变量的分布在期望附近的集中情况。

### Chernoff Bound

从Chebyshev不等式的构造中可以看出，事实上选取任何单调的函数应用在Markov不等式上都可以得到一个不等式。也即我们可以选取任意单调的$f$应用在$\Pr[X-\E [x]\geq a]$上（方便起见仅考虑期望右侧的分布），得到$\Pr[X-\E [X]\geq a]=\Pr[f(X-\E [X])\geq f(a)]\leq \dfrac{\E [f(X-\E [X])]}{f(a)}$。关键在于我们要选取适当的$f$来使得$\E [f(X-\E [X])]$形成一个有效的估计的项。在Chebyshev不等式中，我们选取了二次函数$f(x)=x^2$得到了“方差”这一估计项。一个自然的想法是，如果选取指数函数$f(x)=e^{tx}$，这一项就会变成矩生成函数(moment generating function)的$\E[e^{tX}]$。记$\mu=\E [X]$，得到$\Pr[X-\mu\geq a]=\Pr[e^{t(X-\mu)}\geq e^{ta}]\leq\dfrac{\E [e^{t(X-\mu)}]}{e^{ta}}=\dfrac{\E [e^{tX}]}{e^{t(\mu+a)}}$。把加法常数$a$改写成因子常数$\delta$，我们可以把以上不等式等价地重写为$\Pr[X\geq (1+\delta)\mu]\leq \dfrac{\E [e^{tX}]}{e^{t(1+\delta)\mu}}$。

当$X$是$n$个独立的满足同一个伯努利分布$\text{Ber}(p_i)$的随机变量$X_i$的和时，也即$X=\sum\limits_{i=1}^{n}X_i$，我们发现我们对$\E [e^{tX}]$会有一个很好的估计：$\E [e^{tX}]=\E [e^{t\sum\limits_{i=1}^{n}X_i}]$ $=\E [\prod\limits_{i=1}^{n}e^{tX_i}]$$=\prod\limits_{i=1}^{n}\E [e^{tX_i}]$，根据伯努利分布，$\E [e^{tX_i}]=p_i\cdot e^{t}+$ $(1-p_i)\cdot e^0=$$1+p_i(e^t-1)$，由指数函数的基本不等式$1+x\leq e^x$得$\E [e^{tX_i}]\leq e^{p_i(e^t-1)}$。代入可得$\E [e^{tX}]\leq\prod\limits_{i=1}^{n}e^{p_i(e^t-1)}=e^{(e^t-1)\sum\limits_{i=1}^{n}p_i}=e^{(e^t-1)\sum\limits_{i=1}^{n}\E [X_i]}=e^{(e^t-1)\E [X]}=e^{(e^t-1)\mu}$。综上，我们得到$\Pr[X\geq (1+\delta)\mu]\leq\dfrac{e^{(e^t-1)\mu}}{e^{t(1+\delta)\mu}}=\left(\dfrac{e^{e^t-1}}{e^{t(1+\delta)}}\right)^\mu$。由于$t$是任意的，我们可以取使得等式右侧取最小值的$t$。只需分析$\dfrac{e^{e^t-1}}{e^{t(1+\delta)}}$的单调性，等价于分析$e^t-1-t(1+\delta)$的单调性。对$t$求导得$e^t-(1+\delta)$，可见导函数单调递增，原函数在$t=\ln(1+\delta)$取最小值。代入得到$\Pr[X\geq (1+\delta)\mu]\leq\left(\dfrac{e^{\delta}}{(1+\delta)^{(1+\delta)}}\right)^\mu$。同理，期望的左侧满足$\Pr[X\leq (1-\delta)\mu]\leq\left(\dfrac{e^{-\delta}}{(1-\delta)^{(1-\delta)}}\right)^\mu$。这一结论称为Chernoff Bound：

设$X_i\sim \text{Ber}(p_i)$独立同分布，令$X=\sum\limits_{i=1}^{n}X_i$，那么对于$\delta>0$，$$\begin{matrix} \Pr[X\geq (1+\delta)\mu]\leq\left(\dfrac{e^{\delta}}{(1+\delta)^{(1+\delta)}}\right)^\mu\\  \Pr[X\leq (1-\delta)\mu]\leq\left(\dfrac{e^{-\delta}}{(1-\delta)^{(1-\delta)}}\right)^\mu 
\end{matrix}$$
其中$\mu=\E[X]=np_i$。

> 当$0<\delta<1$时，通过简单的求导分析可以得到$\dfrac{e^{\delta}}{(1+\delta)^{(1+\delta)}}\leq e^{-\frac{\delta^2}{3}}$，$\dfrac{e^{-\delta}}{(1-\delta)^{(1-\delta)}}\leq e^{-\frac{\delta^2}{2}}$。所以我们可以得到弱一点但更常用的Chernoff Bound：对于$0<\delta<1$，$\left\{\begin{matrix} \Pr[X\geq (1+\delta)\mu]\leq e^{-\frac{1}{3}\delta^2\mu}\\  \Pr[X\geq (1-\delta)\mu]\leq e^{-\frac{1}{2}\delta^2\mu}\end{matrix}\right.$

从弱化的Chernoff Bound中可以看出，独立同分布伯努利变量的和的tail可以用形如$e^{-c x^2}$的函数来bound，这称为exponential tail。一个常见的具有二次的exponential tail的分布正是高斯分布。也就是说，独立同分布伯努利变量的和的分布曲线可以用一条正态分布的钟形曲线来bound！这并不以外，因为中心极限定理就是指出独立同分布变量的和会趋向正态分布。所以，Chernoff Bound可以看作是对于伯努利变量的有限版本的中心极限定理。独立同分布伯努利变量的和以类似正太分布的方式集中在期望周围。

### Hoeffding不等式

和Chernoff Bound中类似，我们寻找另外的能够bound $\E[e^{tX}]$的情况。一个可行的情况是$X$是$n$个独立的属于某个闭区间的随机变量的和（不一定同分布）。那么可以设$X_i\in [a_i,b_i]$，$X=\sum\limits_{i=1}^{n}X_i$，那么$\E [e^{tX}]=\E [e^{t\sum\limits_{i=1}^{n}X_i}]$ $=\E [\prod\limits_{i=1}^{n}e^{tX_i}]$$=\prod\limits_{i=1}^{n}\E [e^{tX_i}]$。我们可以不失一般性假设$X_i$的期望都是$0$，那么$a_i<0<b_i$，此时有Hoeffding Lemma指出$\E[e^{tX_i}]\leq e^{\frac{t^2(b_i-a_i)^2}{8}}$。这是一个凸不等式，证明比较复杂，此处省略。于是$\prod\limits_{i=1}^{n}\E [e^{tX_i}]\leq\prod\limits_{i=1}^{n}e^{\frac{t^2(b_i-a_i)^2}{8}}=e^{\frac{t^2}{8}\sum\limits_{i\in [n]}(b_i-a_i)^2}$。所以我们代入$\Pr[X\geq a]=\Pr[e^{tX}\geq e^{ta}]\leq\dfrac{\E [e^{tX}]}{e^{ta}}$得到$\Pr[X\geq a]\leq \exp\left(\dfrac{t^2}{8}\sum\limits_{i\in [n]}(b_i-a_i)^2-ta\right)$，取二次函数最小值点$t=\dfrac{4a}{\sum\limits_{i\in [n]}(b_i-a_i)^2}$代入，得到$\Pr[X\geq a]\leq \exp\left(-\dfrac{2a^2}{\sum\limits_{i\in[n]}(b_i-a_i)^2}\right)$。另一侧也是同理，$\Pr[X\leq -a]\leq \exp\left(-\dfrac{2a^2}{\sum\limits_{i\in[n]}(b_i-a_i)^2}\right)$。

综上，我们有Hoeffding不等式：对于一列独立的随机变量$X_i$，如果$X_i\in [a_i,b_i]$，那么设$X=\sum\limits_{i=1}^{n}X_i$，那么有$\Pr[|X-\E[X]|\geq t]\leq 2 \exp\left({-\dfrac{2t^2}{\sum\limits_{i\in[n]}(b_i-a_i)^2}}\right)$。

### Concentration

以上不等式其实都在刻画随机变量的分布（在期望附近）的集中程度，所以称为Concentration Inequalities。Concentration是我们研究随机变量时的一个重要概念，我们关心在多高的概率下，随机变量会分布在一个多大的范围内。例如，假设随机变量的期望是$2n$，我们想问有多大概率随机变量始终落在$(2n-\sqrt{n},2n+\sqrt{n})$内？这就是一个concentration的问题。

Concentration不等式还是用概率方法分析问题时的一个常用技巧。基于Markov不等式的方法称为“一阶矩方法”，基于Chebyshev不等式的方法称为“二阶矩方法”，基于Chernoff Bound的方法称为“Chernoff方法”。我们会详细讨论这些方法。

















​	
