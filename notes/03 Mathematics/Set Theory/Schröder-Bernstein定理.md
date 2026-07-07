## Schröder-Bernstein's Theorem

对任意集合$A,B$，若$f: A \to B$与$g: B \to A$都是单射，那么存在$A\to B$的双射。

## Context

设$f: A \to B, g: B \to A$是单射。假设$A,B$都是有限集，那么该结论是显然的，$f,g$本身就是这个双射。否则，说明$|B|>|A|$而由$g$是单射得到$|A|\geq |B|$，矛盾。

对于无穷集，这个结论并不显然。例如，我们可以构造$[0,1]\to [0,1)$的单射$f(x)=x/2$，也可以构造$[0,1)\to [0,1]$的单射$g(x)=x$，但$f,g$都不是双射。而根据Schröder-Bernstein's Theorem，应当存在一个$[0,1]\to [0,1)$的双射。事实上，能够和自己的真子集建立双射是无穷集合的一个特征。

## Proof

因为$g$是单射，因此$g(B)\subseteq A$。我们取出$A\setminus g(B)$，记为$C_0$，那么$f(C_0)\subseteq B$，记$D_0=f(C_0)$。我们观察到，从集合$C_0$通过$f$映射到集合$D_0$，那么这个映射既是单射又是满射，所以$C_0$与$D_0$之间存在双射。

于是，我们可以抛开$C_0,D_0$，只需证明$A_1=A\setminus C_0$到$B_1=B\setminus D_0$存在双射（因为如果在两个无交的定义域上有双射，合并起来也是双射）。仿照刚才的方法，令$C_1=A_1\setminus g(B_1)$，$D_1=f(C_1)$，可以得到$C_1$与$D_1$之间存在双射。

以上步骤可以无限进行下去。也就是说，我们可以定义$A_{n+1} = A \setminus \bigcup_{i=0}^{n} C_i$，$B_{n+1}=B \setminus \bigcup_{i=0}^{n}D_i$，然后得到$C_{n+1}=A_{n+1}\setminus g(B_{n+1})$与$D_{n+1}=f(C_{n+1})$之间存在双射。关键在于，我们可以定义无穷集合序列的并集。根据上面的讨论，对于任何取定的自然数$n$，我们都可以直接由$f$给出$\bigcup_{i=0}^{n} C_i\to \bigcup_{i=0}^{n}D_i$的双射，所以$f$可以给出$\bigcup_{i=0}^{\infty} C_i\to \bigcup_{i=0}^{\infty}D_i$的双射。

于是接下来，我们只需要找到$A\setminus \bigcup_{i=0}^{\infty} C_i\to B\setminus\bigcup_{i=0}^{\infty}D_i$的双射。我们发现，这部分的映射恰好可以由$g$给出：下面我们证明$g$能给出从$B \setminus \bigcup_{i=0}^{\infty} D_i$到$A \setminus \bigcup_{i=0}^{\infty} C_i$ 的双射。这也就证明了$g$是$A\setminus \bigcup_{i=0}^{\infty} C_i\to B\setminus\bigcup_{i=0}^{\infty}D_i$的双射。

方便起见，记$B^\ast=B \setminus \bigcup_{i=0}^{\infty} D_i$，$A^\ast=A \setminus \bigcup_{i=0}^{\infty} C_i$。为了证明$g$能给出$B^\ast\to A^\ast$的双射，只需证明：

(1) $\forall b \in B^\ast, \exists a \in A^\ast, g(b) = a$；

(2) $\forall a \in A^\ast, \exists b \in B^\ast, g(b) = a$；

对于(1)，我们已知$\forall b\in B^\ast,\exists c \in A, g(b) = c$。那么只需证明$\forall n\in \N,c \notin C_n$。假设 $c \in C_n$，分类讨论：若$n = 0$，那么$c\in C_0=A\setminus g(B)$，因此$c\not\in g(B)$，与$g(b)=c$矛盾；若$n = m + 1$，那么$c \in C_{m+1}$，其中$C_{m+1}=A_{m+1}\setminus g(B_{m+1})$，因此$c\not\in g(B_{m+1})$，也即$g(b)\not\in g(B_{m+1})$，也即$b\not\in B_{m+1}$，也即$b\in \bigcup_{i=0}^{m}D_i$。而$b\in B^\ast$，矛盾。综上，$c \in A^\ast$。因此取$a=c$即可。

对于(2)，我们有$\forall a\in A^\ast,\exists d \in B, g(b) = a$。否则，$a\not\in g(B)$，也即$a\in A\setminus g(B)=C_0$，与$a\in A^\ast$矛盾。那么只需证明$d\in B^\ast$，也即$\forall n\in \N,d \notin D_n$。假设 $d \in D_n$，也即$d\not\in B\setminus \bigcup_{i=0}^{n}D_n=B_{n+1}$，因此$a=g(d)\not\in g(B_{n+1})$，而$a\in A^\ast$，因此$a\in A_{n+1}$，所以$a \in A_{n+1}\setminus g(B_{n+1})$，也即$a \in C_{n+1}$。这与$a \in A^\ast$矛盾。综上，$d \in B^\ast$。因此取$b=d$即可。

综上所述，我们只需令

$h(a) := \begin{cases}  f(a), & \text{if} \, a \in \bigcup_{i=0}^{\infty} C_i \\ g^{-1}(a), & \text{if} \, a \in A \setminus \bigcup_{i=0}^{\infty} C_i  \end{cases}$

则$h$就给出了$A$到$B$的一个双射。

## Observation

所以，Schröder-Bernstein定理的证明思路其实很直观。我们每次从右侧用$g$映射一个像集到左侧，抠除像集得到的圆环用$f$映射到右侧（也是一个圆环）恰好得到一个双射。那么只需不断重复以上步骤，不断剥去圆环，证明双射。最后我们根据定义再证明余下部分可以由$g$形成双射即可。该过程可以用下图清晰地表示：

![image-20250218225936949](https://blog-static.cnblogs.com/files/qixingzhi/schroder_bernstein.gif?t=1739898449&download=true)

以上Schröder-Bernstein定理的证明本身就是构造性的。我们可以由此给出一个$[0,1]\to [0,1)$的双射。其中$f(x)=x/2,g(x)=x$。$C_0=[0,1]\setminus [0,1)=\{1\}$，$D_0=f(C_0)=\{1/2\}$，$A_1=[0,1),B_1=[0,1)\setminus\{1/2\}$，$C_1=\{1/2\}$，$D_1=\{1/4\}$，$A_2=[0,1)\setminus \{1/2\}$，$B_2=[0,1)\setminus\{1/4,1/2\}$，$C_2=\{1/4\},D_2=\{1/8\}$，……以此类推，$A^\ast = B^\ast = [0,1)\setminus\{1/2,1/4,\cdots,1/2^k,\cdots\}$，所以$h$可以构造如下：

$h(x) := \begin{cases}  x/2, & \text{if} \, \exists k\in\N,x=1/2^k \\ x, & \text{if} \, \forall k\in\N,x \neq 1/2^k  \end{cases}$

这是$[0,1]\to [0,1)$的双射。
