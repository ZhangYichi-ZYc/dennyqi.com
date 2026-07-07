图灵(Turing)和丘奇(Church)都为“计算”建立了模型，图灵的模型是图灵机，丘奇的模型是$\lambda$-calculus。可以证明这两个模型在计算能力（可计算的问题的集合）上是等价的。基于图灵机的原理诞生了Fortran，Pascal等等的编程语言，他们称为指令式编程语言(imperative programming language)，它们是通过按照顺序执行指令控制读写头的移动和读写来实现计算的；与之相对的，基于$\lambda$-calculus的原理诞生了Lisp，Coq等等，它们称为函数式编程语言(functional programming language)，它们是通过按照一定规则对字符串表达式进行重写(rewrite)而完成计算的。$\newcommand{\l}{\lambda}$

## $\lambda$-terms

我们把符号$v$与若干个撇称为一个变量(variable)符号，全体变量符号的集合为$V=\{v,v',v'',\cdots\}$。满足以下构造规则的符号串称为一个$\lambda$-term：

- 单个变量$x\in V$是一个$\lambda$-term；
- 如果$M,N$都是$\lambda$-term，那么$(MN)$是一个$\lambda$-term；
- 如果$x\in V$，并且$M$是一个$\lambda$-term，那么$(\lambda xM)$是一个$\lambda$-term；

所有$\lambda$-term组成的集合记为$\Lambda$。例如，$((\lambda v(v'v))v'')\in \Lambda$。通常，我们可以用$x,y,z,\cdots$来表示变量，并且省略最外层括号。例如，$(\lambda x(yx))z\in \Lambda$。

## 自由变量(free variables)

下面归纳地定义一个$\lambda$-term中的自由变量(free variable)集合，$M$中的自由变量集合记为$FV(M)$：

- 对于单个变量$x\in V$，$FV(x) = {x}$；
- 对于两个$\lambda$-term $M,N$，$FV(MN) = FV(M)\cup FV(N)$；
- 对于变量$x$与$\lambda$-term $M$，$FV(\lambda xM) = FV(M)\setminus \{x\}$

在一个$\l$-term中，如果$x$不是自由变量，就称$x$是一个受限变量(bounded variable)。如果$M$中没有自由变量（比如$M=\lambda x x$），就称$M$是一个封闭的$\l$-term (closed $\l$-term)。全体封闭$\lambda$-term集合记为$\Lambda^0$。

## 替换(substitutions)

假设$M,N$是$\l$-term，$x$是一个变量，我们用记号$M[x:=N]$表示把$M$中所有自由出现的$x$替换为$N$。具体定义如下：

- 对于单个变量$x\in V$，$x[x:=N]$表示$N$；
- 对于单个变量$y\in V$，若$y\neq x$，则$y[x:=N]$表示$y$；
- 对于$\lambda$-term $M_1,M_2,N$，$(M_1M_2)[x:=N]$表示$(M_1[x:=N])(M_2[x:=N])$；
- 对于变量$x,y$与$\lambda$-term $M,N$，$(\lambda yM)[x:=N]$表示$\lambda y(M[x:=N])$

## 演算规则(Rules)

$\l$-calculus的最基本的演算规则是：对于$\l$-term $M,N$和变量$x$，$(\lambda xM)N$可以演算得到$M[x:=N]$。其中，我们用等号来表示“可以演算得到”，所以这一规则可以写作
$$
(\lambda
x M)N=M[x:=N]\tag{$\beta$}
$$
这一规则称为$\beta$-conversion，这使得$\l xM$这样的项可以被看作“函数”，当一个函数“作用(apply)”在一个$\l$-term上时，就是把这个term“代入”该函数的表达式。由于紧跟在$\l$后面的受限变量$x$仅仅起到一个临时变量的作用，我们并不关心这个变量的取值，所以$\l$-calculus还提供以下演算规则，称为$\alpha$-equivalance（前提是$M$中不包含变量$y$）：
$$
\lambda xM=\lambda y(M[x:=y])\tag{$\alpha$}
$$
除了$\beta$-conversion和$\alpha$-equivalance，在$\l$-calculus中还必须保证以下基本的演算规则：

(1) 演算的等价关系性质：

- 自反性：$M=M$；
- 对称性：$M=N \iff N=M$；
- 传递性：$M=N,N=L\implies M=L$；

(2) 相容性(compatibility)：

- $M=M'\implies MZ=M'Z$；
- $M=M'\implies ZM=ZM'$；
- $M=M'\implies \l xM=\l xM'$；

compatibility意味着我们总是可以用根据等式的局部替换来rewrite一个$\l$-term。

## 柯里化(Currying)

根据$\beta$-conversion，$\lambda x M$可以看作“一元函数”。如果要表示“二元函数”，可以用$\lambda x(\lambda y M)$的形式。这是因为当一个二元函数apply在两个term上时，可以看作该二元函数首先apply在第一个term上得到了一个一元函数，这个一元函数再apply在第二个term上得到了函数值。这种把多元函数拆分成多个一元函数的想法最早是由H.B. Curry提出的，称为函数的柯里化(Currying)。

记$F\equiv\l x(\l y M)$，它apply在$N_1,N_2$上时应当写作$(FN_1)N_2$，这样就会有$(FN_1)N_2\equiv((\l x(\l y M))N_1)N_2=(\l y (M[x:=N_1]))(N_2)$$=(M[x:=N_1])[y:=N_2]$。一般地，如果$F$是$n$元函数，它apply在$N_1,\cdots,N_n$时应当写作$( \cdots((FN_1)N_2)\cdots N_n)$。方便起见，我们规定apply是左结合的，这样我们就可以在表示多元函数时省略括号，写为$FN_1N_2\cdots N_n$。

在函数本身的表示上，对于二元函数我们写$\l x_1(\l x_2 M)$，对于$n$元函数我们写$\l x_1(\l x_2(\l x_3(\cdots (\l x_nM))))$。所以，多个$\l x_i$之间是右结合的，不能省略括号。为了方便，我们发明下面的符号来简化书写：只写一个$\l$，然后把变量并排依次写出，然后写一个点，然后写函数体，这样$n$元函数简写为$\l x_1x_2\cdots x_n.M$。

用归纳法易证$(\l x_1\cdots x_n.M)N_1\cdots N_n=(( \cdots(M[x_1:=N_1])\cdots)[x_n:=N_n])$。

“函数”一词是集合论或日常语言中的定义。在$\l$-calculus中，形如$\l x_1\cdots x_n.M$的term称为combinator(组合子)。例如，通常记$\textsf{I}\equiv \l x.x$，这就是“恒等映射”，$\textsf{I}M=M$；记$\textsf{K}\equiv \l xy.x$，它用来取两个term中的前一个，$\textsf{K}MN=M$；记$\textsf{K}_\ast\equiv \l xy.y$，用来取两个term中的后一个，$\textsf{K}_\ast MN=N$；…







