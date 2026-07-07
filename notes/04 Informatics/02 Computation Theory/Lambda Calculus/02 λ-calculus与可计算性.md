$\newcommand{\l}{\lambda}$图灵证明了图灵机可计算的函数等价于由$\lambda$-calculus定义的可计算函数。$\lambda$-calculus定义的可计算函数就是能用$\l$-term表示的函数（从自然数到自然数的映射）。在$\l$-calculus中，“计算”是通过term的rewrite来完成的，因此函数的计算往往意味着符号串的“递归”。我们将会定义递归函数(recursive functions)的概念，并证明满足该定义的函数等价于能用$\l$-term表示。

## 数学的$\l$-calculus表示

### 逻辑的表示(Logic)

$\newcommand{\true}{\textsf{true}}\newcommand{false}{\textsf{false}}$我们可以用$\l$-term表示逻辑真和逻辑假。我们可以用combinator $\textsf{K}\equiv \l xy.x$表示逻辑真，$\textsf{K}_\ast \equiv \l xy.y$表示逻辑假。记$\textsf{K}\equiv \textsf{true},\textsf{K}_\ast\equiv \textsf{false}$。把$\l$-term的集合$\{\textsf{true},\textsf{false}\}$称为布尔式(Boolean)，那么假设一个$\l$-term $B$可以演算得到一个布尔式（$B=\textsf{true}$或$B=\false$），那么对于任意的$P,Q\in \Lambda$，$BPQ$就可以用来表示一个“if语句”：`if B then P else Q`。

### 自然数的表示(Numerals)

利用布尔值，我们可以表示有序对(ordered pair)。对于$M,N\in\Lambda$，$(\l z.(zMN) )\true$$=\true MN=M$，$(\l z.(zMN) )\false$$=\false MN=N$。我们把$\l z.(zMN)$记为$[M,N]$，于是得到$[M,N]\true=M,[M,N]\false=N$。

$\newcommand{\num}[1]{\lceil #1 \rceil}$利用有序对，我们可以表示自然数。首先，用$\l x.x$表示$0$，记为$\num 0$；假设$n$表示为$\num n$，那么$\num{n+1}$可以表示为$[\false,\num n]$。

在这样的表示下，我们可以找到一个combinator用来表示自然数的后继(successor)：令$\textsf{S}^+ \equiv \l x.[\false,x]$，我们有$\textsf{S}^+ \num n=(\l x.[\false ,x])\num n$$= [\false,\num n] = \num {n+1}$。

我们可以找到一个combinator用来表示前驱(predecessor)：令$\textsf{P}^-\equiv\l x.(x\ \false)$，我们有$\textsf{P}^-\num{n+1}\equiv$$(\l x.(x \ \false))[\false,\num n]=[\false,\num n]\false = \num n$。

还可以找到一个combinator用来判断一个数是否是$0$：只需令$\textsf{Zero}\equiv \l x.(x \ \true)$，我们有$\textsf{Zero}\num 0 \equiv (\l x.(x \ \true))(\l x.x)=(\l x.x)\true=\true$，有$\textsf{Zero}\num{n+1}\equiv(\l x.(x \ \true))[\false,\num n]=[\false,\num n]\true=\false$。

### 数值函数的表示(Numeric Functions)

自然数的$p$元函数$\N^p\to \N$称为一个$p$-数值函数。对于一个$p$-数值函数，如果能找到一个combinator $F$满足：对于任意的$n_1,\cdots,c_p\in\N$，都有$\num{\varphi(n_1,\cdots,n_p)} = F\num{n_1}\cdots \num{n_p}$，就称$\varphi$是$\lambda$-definable的（具体地，也称$\l$-defined by $F$）。

## 递归函数(Recursive Functions)

我们已经看到，$S^+(n)=n+1$可以由$\textsf{S}^+$定义，$Z(n)=0$可以由$\l x.\num 0$定义。函数$U_i^n(x_1,\cdots,x_n)=x_i$很容易由有序对的combinator来定义。以上三个数值函数$U_i^n,S^+,Z$称为initial functions(初始函数)。Initial functions都是$\lambda$-definable的。

$\newcommand{\A}{\mathcal{A}}$对于一个数值函数的集合$\mathcal{A}$，如果$\mathcal{A}$满足：$\forall p,m$，对任意的$\mathcal{A}$中的$p$-数值函数$\psi_1,\cdots,\psi_m$，以及$\A$中的$m$-数值函数$\chi$，复合函数$\chi(\psi_1(n_1,\cdots,n_p),\cdots,\psi_m(n_1,\cdots,n_p))$也是$\A$中的一个$p$-数值函数，就称集合$\A$对复合封闭(closed under composition)。

$\newcommand{\A}{\mathcal{A}}$对于一个数值函数的集合$\mathcal{A}$，如果$\mathcal{A}$满足：$\forall p$，对任意的$\mathcal{A}$中的$p$-数值函数$\chi$，以及$\A$中的$p+2$-数值函数$\psi$，定义$p+1$-数值函数$\varphi$：$\varphi(0,n_1,\cdots,n_p)$$=\chi(n_1,\cdots,n_p)$，$\varphi(k+1,n_1,\cdots,c_p)$$=\psi(\varphi(k,n_1,\cdots,n_p),k,n_1,\cdots,n_p)$，始终有$\varphi \in \A$，就称集合$\A$对原始递归封闭(closed under primitive recursion)。

对于一个数值函数的集合$\mathcal{A}$，如果$\mathcal{A}$满足：$\forall p$，对任意的$\mathcal{A}$中的$p+1$-数值函数$\chi$，其中$\chi$满足对任意的$n_1,\cdots,n_p\in \N$，存在$m$使得$\chi(n_1,\cdots,n_p,m)=0$，定义$p$-数值函数$\varphi$：$\varphi(n_1,\cdots,n_p)$的值为使得$\chi(n_1,\cdots,n_p,m)=0$的最小$m$，若始终有$\varphi \in \A$，就称集合$\A$对取最小值封闭(closed under minimalization)。

$\newcommand{\R}{\mathcal{R}}$定义数值函数集合$\R$，它是包含所有初始函数并且满足对复合、原始递归、取最小值封闭的最小集合。$\R$称为递归函数类，称$\R$中的函数为递归函数(recursive function)。

## $\l$-definable函数与递归函数的等价性

我们已经证明，初始函数都是$\l$-definable的。如果我们能够证明，全体$\l$-definable的函数集合（记为$\Lambda_F$）满足对复合、原始递归、取最小值封闭，就说明$\R\subseteq \Lambda_F$，也即递归函数一定是$\l$-definable的。下面我们就分别证明，$\Lambda_F$对复合、原始递归、取最小值封闭。

下面证明$\Lambda_F$对复合封闭。即证$\forall p,m$，对任意的$\Lambda_F$中的$p$-数值函数$\psi_1,\cdots,\psi_m$，以及$\Lambda_F$中的$m$-数值函数$\chi$，复合函数$\chi(\psi_1(n_1,\cdots,n_p),\cdots,\psi_m(n_1,\cdots,n_p))$是$\l$-definable的。设$\psi_1,\cdots,\psi_m$分别由combinator $H_1,\cdots,H_m$定义，$\chi$由combinator $G$定义，那么可以写出combinator $F\equiv \lambda x_1\cdots x_m.(G(H_1x_1\cdots x_n)$$\cdots (H_mx_1\cdots x_m))$，可见该复合函数能被$F$定义。因此$\Lambda_F$对复合封闭。

下面证明$\Lambda_F$对原始递归封闭。即证$\forall p$，对任意的$\Lambda_F$中的$p$-数值函数$\chi$，以及$\Lambda_F$中的$p+2$-数值函数$\psi$，$p+1$-数值函数$\varphi$：$\varphi(0,n_1,\cdots,n_p)$$=\chi(n_1,\cdots,n_p)$，$\varphi(k+1,n_1,\cdots,c_p)$$=\psi(\varphi(k,n_1,\cdots,n_p),k,n_1,\cdots,n_p)$是$\l$-definable的。设$\psi$由combinator $H$定义，$\chi$由combinator $G$定义，现在我们要构造一个combinator $F$来定义$\varphi$。对于$\varphi$这样的分段函数，需要用逻辑条件的$\l$表示。我们希望$Fxy_1\cdots y_p= (\textsf{Zero } x)(Gy_1\cdots y_p)(H(F(\textsf{P}^- x)y_1\cdots y_p)(\textsf{P}^- x)y_1\cdots y_p)$，其中$\textsf{Zero }x$是一个布尔变量，如果为真（此时$x\equiv \num 0$）就会取前项$Gy_1\cdots y_p$，如果为假（$x\not\equiv \num 0$）就会取后项$H(F(\textsf{P}^- x)y_1\cdots y_p)(\textsf{P}^- x)y_1\cdots y_p$。我们注意到，正因为$\varphi$是递归定义的，所以我们写出的式子左右都包含$F$。所以刚才写出的式子不能作为$F$的构造式，而是一个$F$的“方程式”。把右边部分的式子$(\textsf{Zero } x)(Gy_1\cdots y_p)(H(F(\textsf{P}^- x)y_1\cdots y_p)(\textsf{P}^- x)y_1\cdots y_p)$记为$D(F,x,y_1,\cdots,y_p)$，该方程写作$F=\lambda xy_1\cdots y_p.(D(F,x,y_1,\cdots,y_p))$。这等价于$F=\lambda fxy_1\cdots y_p.(D(f,x,y_1,\cdots,y_p))F$。把$\lambda fxy_1\cdots y_p.(D(f,x,y_1,\cdots,y_p))$记为$M$，我们也就是要找到满足$F=MF$的$F$。令$F\equiv (\l z.M(zz))(\l z.M(zz))$，可以验证$F=(\l z.M(zz))(\l z.M(zz))=M((\l z.M(zz))(\l z.M(zz)))=MF$。（类比代数中$x=f(x)$的解称为不动点，这可以看作求$\l$表达式的不动点。从上述构造可以看出，对任意的$M$都可以写出对应的$F$满足$MF=F$。这一结果称为不动点定理(Fixed Point Theorem)）。因此$\Lambda_F$对原始递归封闭。

下面证明$\Lambda_F$对取最小值封闭。即证$\forall p$，对任意的$\Lambda_F$中的$p+1$-数值函数$\chi$，记$\mu m[\chi(n_1,\cdots,n_p,m)=0]$表示满足$\chi(n_1,\cdots,n_p,m)=0$的最小$m$，$p$-数值函数$\varphi(n_1,\cdots,n_p)=\mu m[\chi(n_1,\cdots,n_p,m)=0]$是$\l$-definable的。设$\chi$由combinator $G$定义。我们可以这样定义用来表示$\varphi$的combinator $F$：首先定义一个combinator $H$，对于$Hx_1\cdots x_p y$，判断是否成立$Gx_1\cdots x_py$为$\num 0$，如果成立返回$y$，否则返回$Hx_1\cdots x_p(\textsf{S}^+ y)$。这样，$Hx_1\cdots x_p\num 0$就会返回最小的使得$Gx_1\cdots x_py$为$\num 0$的$y$。用逻辑条件容易写出：$Hx_1\cdots x_py=(\textsf{Zero}(Gx_1\cdots x_p y))$$(y)(Hx_1\cdots x_p(\textsf{S}^+ y))$。很容易想到，我们要再次用到不动点定理。令$E(H,x_1,\cdots,x_p,y))\equiv (\textsf{Zero}(Gx_1\cdots x_p y))$$(y)(Hx_1\cdots x_p(\textsf{S}^+ y))$，那么$H = (\l hx_1\cdots x_p y.E(h,x_1,\cdots,x_p,y))H$，由不动点定理可以解出$H$。于是，令$F\equiv \l x_1\cdots x_p.(Hx_1\cdots x_p\num 0)$，容易验证$F$定义了$\varphi$。因此$\Lambda_F$对取最小值封闭。

还可以证明，$\Lambda_F\subseteq \R$（用$\l$-term的哥德尔编码证明，此处省略）。这样我们最终得到了$\Lambda_F=\R$，也即$\forall \varphi$，$\varphi$是$\lambda$-definable的当且仅当$\varphi\in \R$。











