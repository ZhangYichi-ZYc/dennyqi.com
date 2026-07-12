## 微分熵(Differential Entropy)$\newcommand{\d}{\text{ d}}$

对于连续的随机变量$X$，假如它有概率密度函数$f(x)$，那么我们仿照离散熵的表达式，定义$X$的微分熵为$h(X)=-\displaystyle\int_S f(x)\log f(x)\d x$。其中，$S=\{x\mid f(x)>0\}$。根据定义，连续随机变量的微分熵只与$f$有关而与具体的取值无关，因此$h(X)$也可以记为$h(f)$。

当$X$是$[0,a]$上的均匀分布时，$f(x)=\dfrac{1}{a}$，$S=[0,a]$。于是$h(X)=-\displaystyle\int_0^a \dfrac 1 a \log \dfrac 1 a\d x=-\dfrac 1 a \log \dfrac 1 a\displaystyle\int_0^a \d x=\log a$。由此可见，当$a\in (0,1)$时，$h(X)<0$。可见微分熵可以取负数值，这与离散熵很不同。这意味着，微分熵的“含义”本身就已经与离散熵完全不同，离散熵可以理解为平均意义下表示一个随机变量需要多少个bit，而这不可能是一个负数。

微分熵并不描述一个随机变量所包含的“信息量”。事实上，我们不可能沿用与离散时相同的方法来描述连续随机变量的信息量。试想要描述一个在$[0,1]$上均匀分布的连续随机变量$X$需要多少位？这样的连续随机变量可以用一列$X_1,\cdots,X_n,\cdots$分别描述小数点后的某一位，每个$X_i$都在$[9]$上均匀取值，这样$X$的信息量就等于所有的$H(X_i)$求和，得到正无穷。也就是说，一个连续随机变量的离散信息量是无穷的，需要无穷位才能描述。

既然不可能完全精确描述实数，那么如果我们对$X$做截断，只要求描述连续分布中$X$在小数点后的前若干位呢？等价地，我们研究当我们对$f(x)$做离散分割后得到的离散熵与微分熵的关系。取$\delta>0$，把$S$分割为$[n\delta,(n+1)\delta]$的区间，在每个区间上根据积分中值定理都有$\delta\cdot f(\xi_n)=\displaystyle\int_{n\delta}^{(n+1)\delta} f(x)\d x$，令离散随机变量$X^{(\delta)}=\xi_n$，如果$X\in [n\delta,(n+1)\delta]$。显然，$p(X^{(\delta)})=f(\xi_n)\delta$，那么$H(X^{(\delta)})=-\sum\limits_{n}f(\xi_n)\delta\cdot \log(f(\xi_n)\delta)$ $=-\sum\limits_{n}f(\xi_n)\delta\cdot \log(f(\xi_n))-\sum\limits_{n}f(\xi_n)\delta\cdot \log\delta$，因为$\sum\limits_{n}f(\xi_n)\delta=1$，所以得到$\sum\limits_{n}f(\xi_n)\delta\cdot \log(f(\xi_n))-\log\delta$，当$n\to\infty$时前者就是$h(X)$。由此，$H(X^{(\delta)})=h(X)-\log\delta$。可见微分熵可以理解为$H(X^{(\delta)})+\log\delta$，也即如果用精度为$\delta$的离散变量来逼近，离散熵总是等于微分熵加上一个$-\log\delta$的项。当$\delta\to 0$时，$-\log\delta\to+\infty$。

$\newcommand{\E}{\mathbb{E}}$由于大数定理对连续情形依然成立，所以我们对于渐进均分性(AEP)以及典型集的讨论都可以继承离散的情形。$-\dfrac{1}{n}\log f(X_1,\cdots,X_n)\to \E[-\log f(X)]=h(f)$。关于典型集，唯一需要修改的是，集合的“大小”现在是无穷大。而如果采用相同的论证，就必须把$\sum\limits_{x}$替换成$\displaystyle\int_{S}\d x$。因此我们定义集合$A$的体积为$\text{Vol}(A)=\displaystyle\int_{A}\d x$，那么再次得到$\Pr(A_\epsilon^{(n)})>1-\epsilon$，$2^{n(h(X)+\epsilon)}\leq \text{Vol}(A_\epsilon^{(n)})\leq (1-\epsilon)2^{n(h(X)-\epsilon)}$。由此可见，微分熵的另一个直观含义在于它刻画了典型集的大小。微分熵越大，典型集越大，随机变量的分布越松散。可见，微分熵依旧在刻画随机变量的“不确定性”，但是在连续意义下不能用信息位数来理解不确定性。

## 性质

与离散熵相比，微分熵的性质与离散熵既有相同点，也有不同点。下面集中讨论这些性质。

### 微分熵的线性变换

对于离散随机变量，如果令$X$变为$X+c$，那么分布不会改变，因此熵不变。而对于连续随机变量，加一个常数相当于概率密度函数的平移，而由于概率密度函数是在整条实轴上取值的，这其实是改变了概率分布的。但我们可以计算得到平移是不改变微分熵的大小的：记$Y=X+c$，则$f_Y(x)=f_X(x+c)$。$h(Y)=-\displaystyle\int_{S_Y} f_Y(x)\log f_Y(x)\d x=-\displaystyle\int_{S_Y} f_X(x+c)\log f_X(x+c)\d x$ $-\displaystyle\int_{S_X} f_X(x)\log f_X(x)\d x=h(X)$。

而如果令$X$变为$aX$，微分熵是会改变的：记$Y=aX$，则$f_Y(x)=\dfrac{1}{|a|}f_X(\dfrac{x}{a})$。$h(Y)=-\displaystyle\int_{S_Y} f_Y(x)\log f_Y(x)\d x$ $=-\displaystyle\int_{S_Y} \dfrac{1}{|a|}f_X(\dfrac{x}{a})\log \left[\dfrac{1}{|a|}f_X(\dfrac{x}{a})\right]\d x$$=-\displaystyle\int_{S_Y} \dfrac{1}{|a|}f_X(\dfrac{x}{a})\log \dfrac{1}{|a|}\d x-\displaystyle\int_{S_Y} \dfrac{1}{|a|}f_X(\dfrac{x}{a})\log f_X(\dfrac{x}{a})\d x$ $=\log |a|+h(X)$。这个结论可以推广至随机向量的情况：$h(AX)=H(X)+\log |\det A|$。

### 信息图

与离散时相同，我们把定义联合微分熵：$h(X_1,\cdots,X_n)=-\displaystyle\int_{S^n}f(x_1,\cdots,x_n)\log f(x_1,\cdots,x_n)\d x_1\cdots \d x_n$，其中$f(x_1,\cdots,x_n)$是联合分布的概率密度函数。定义条件微分熵：$h(X\mid Y)=-\displaystyle\int_{S_{XY}} f(x,y)\log f(x\mid y)\d x\d y$，其中$f(x,y)$是联合分布的概率密度函数，$f(x\mid y)=\dfrac{f(x,y)}{f(y)}$。定义相对熵$D(f(x)||g(x))=\displaystyle\int_{S}f(x)\log\dfrac{f(x)}{g(x)}\d x$，定义互信息$I(X;Y)=\displaystyle\int_{S_{XY}} f(x,y)\log\dfrac{f(x,y)}{f(x)f(y)}\d x\d y$。

所有那些在证明中只涉及到微分熵与离散熵的共同性质的，我们都可以继承离散熵的结论。容易验证，我们可以继承$h(X,Y)=h(X)+h(Y\mid X)$，$h(X,Y)=h(X)+h(Y)-I(X;Y)$这些线性性质，因为求和与积分都是有线性性的。换言之，期望的线性性在离散和连续时都成立。因此我们依然可以利用信息图来计算。

但是由于微分熵不再具有非负的性质，不等式的情形和离散时可能会有不同。但很重要的一点是，我们可以继承相对熵非负的证明。因此对于微分熵也有$D(f||g)\geq 0$。因此$I(X;Y)\geq 0$，连续时互信息依然非负！那么就有推论$h(X,Y)\leq h(X)+h(Y)$（多元时，$h(X_1,\cdots,X_n)\leq\sum\limits_{i\in[n]}h(X_i)$）；$h(X\mid Y)\leq h(X)$，条件熵依然降低不确定性。这一类最基本的信息图上的不等式依然是成立的。

基于$D(f||g)\geq 0$，我们证明定义在闭区间上连续随机变量在满足均匀分布时微分熵最大：不妨设$S=[0,a]$，取$g(x)=\mathbb{1}[x\in [0,a]]\cdot \dfrac{1}{a}$，则$\forall f(x)$，$D(f||g)=\displaystyle\int_{0}^{a}f(x)\log \dfrac{f(x)}{g(x)}\d x\geq 0$，因此$h(f)\leq-\displaystyle\int_0^a f(x)\log g(x)\d x=\log a$，在$f(x)=g(x)$时取到等号。（在离散时，我们也可以用这种方法来证明均匀分布最大化离散熵）

### 平衡信息不等式(Balanced Information Inequality)

而对于一般的微分熵的不等式，如何判断它是否恒成立呢？我们可以证明，一个微分熵的恒等式要能成立，首先要保证它在被改写为离散熵时是恒等式。除此之外，它还要满足一个称为“平衡”的条件：一切微分熵的不等式都可以改写为联合熵求和的形式$\sum\limits_{\alpha\subseteq [n]}w_{\alpha}h(X_{\alpha})\geq 0$，其中$X_{\alpha}:=\{x_i\mid i\in\alpha\}$。例如，$h(X_{1,3,4})=h(X_1,X_3,X_4)$。对于任意的$X_i$，定义$X_i$在不等式中的权重为$\sum\limits_{\alpha}\mathbb{1}[i\in \alpha]\cdot w_{\alpha}$。如果任何$X_i$的权重都为0，则称这不等式是平衡的。一个微分熵不等式$\sum\limits_{\alpha\subseteq [n]}w_{\alpha}h(X_{\alpha})\geq 0$恒成立当且仅当它是平衡的且离散形式$\sum\limits_{\alpha\subseteq [n]}w_{\alpha}H(X_{\alpha})\geq 0$恒成立。这是由于微分熵可以取正值也可以取赋值，只有在平衡点处才会形成恒等式，证明略。

## 再论互信息

在用离散熵近似微分熵时，我们有$H(X^{(\delta)})\to h(X)-\log\delta$。那么既然离散的互信息满足$I(X^{(\delta)},Y^{(\delta)})=H(X^{\delta})-H(X^{(\delta)}\mid Y^{(\delta)})$ $\to h(X)-\log\delta-h(X\mid Y)+\log\delta$$=h(X)-h(X\mid Y)$ $=I(X;Y)$，可见离散的互信息与连续的互信息是近似相等的。这给了我们一种用离散互信息理解连续互信息的方法：可以证明，对于连续随机变量$X,Y$，$I(X;Y)=\sup\limits_{\mathcal{P,Q}}\{ I([X]_{\mathcal{P}};[Y]_{\mathcal{Q}})\}$，其中$\mathcal{P,Q}$是对$X,Y$的任意离散划分。













