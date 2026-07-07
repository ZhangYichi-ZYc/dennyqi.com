图灵证明了图灵机可计算的函数等价于由$\lambda$-calculus定义的可计算函数。下面我们就来看如何由$\lambda$-calculus定义可计算函数。$\newcommand{\l}{\lambda}$

## Church Numerals(丘奇数)

### Church Numerals的定义

首先，我们需要用$\l$-term表示自然数。我们可以用一个combinator表示一个自然数，对于自然数$n$，其对应的combinator会取变量$f,x$，然后把$f$apply到$x$上$n$次。这样定义的自然数称为Church Numerals。

具体地，用$\l fx.(x)$表示自然数0，记为$c_0$；用$\l fx.(f(x))$表示自然数$1$，记为$c_1$；用$\l fx.(f(f(x)))$表示自然数$2$，记为$c_2$。为了书写方便，把$f(f(x))$写作$f^2(x)$，令$x\equiv f^0(x),f^{n+1}(x)=f(f^n(x))$。这样就可以定义：$\forall n\in \N$，$c_n\equiv \l fx.(f^n(x))$。

### Church Numerals的运算

接下来，可以用combinator定义丘奇数的加法、乘法与幂运算。

$\newcommand{\ap}{\textsf{A}_+}$令$\ap\equiv \l xypq.xp(ypq)$

