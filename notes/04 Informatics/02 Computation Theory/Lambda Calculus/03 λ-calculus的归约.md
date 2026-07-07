$\newcommand{\l}{\lambda}$在之前的讨论中，我们用等号$=$表示“可以演算得到”，并且规定等号具有自反、对称、传递的基本性质。这就意味着，我们不仅可以说$(\l x.xx)N$能演算得到$NN$，根据对称性也可以说$NN$能演算得到$(\l x.xx)N$。后者听上去很奇怪，因为与其说是“演算”，后者更像是一种“构造”。作为演算规则的$\beta$-conversion事实上不应该具有对称性，因为它总是倾向于将$\l$-term“化简”。因此我们意识到，对于何为“演算得到”（以及何为“化简”）还没有得到严格的定义。我们应当严格定义一个集合$\Lambda$上的二元关系，来描述“演算”（“化简”）。

## 归约(Reduction)

$\newcommand{\ttob}{\twoheadrightarrow_\beta}\newcommand{\tob}{\rightarrow_\beta}\newcommand{\eqb}{=_\beta}$如果我们把$\alpha$-equivalance看作语法上的设定(convention)，也即我们总是避免局部变量与全局变量的重名，那么$\l$-calculus中唯一的演算规则就是$\l$-term整体或某一局部的$\beta$-conversion。我们定义符号$\tob$表示“单步$\beta$-reduction”：

- 对任意的$\l$-term $M,N$和变量$x$，$(\l x.M)M\tob M[x:=N]$；
- 对任意的$\l$-term $M,N,Z$，如果$M\tob N$，那么$ZM\tob ZN$；
- 对任意的$\l$-term $M,N,Z$，如果$M\tob N$，那么$MZ\tob NZ$；
- 对任意的$\l$-term $M,N$和变量$x$，如果$M\tob N$，那么$\l x.M\tob \l x.N$；

基于单步$\beta$-reduction，可以定义多步$\beta$-reduction（或简称$\beta$-reduction），用符号$\ttob$表示（多步包括0步）：

- 对任意的$\l$-term $M$，$M\ttob M$；（0步）
- 对任意的$\l$-term $M,N$，如果$M\tob N$，那么$M\ttob N$；（单步）
- 对任意的$\l$-term $M,N,L$，如果$M\ttob N,N\ttob L$，那么$M\ttob L$；

原先定义的包含对称性的等号现在可以基于$\beta$-reduction定义如下，为了看上去更清晰我们用符号$\eqb$代替$=$（它们的含义是等价的），称为$\beta$-conversion：

- 对任意的$\l$-term $M,N$，如果$M\ttob N$，那么$M\eqb N$；
- 对任意的$\l$-term $M,N$，如果$M \eqb N$，那么$N\eqb M$；（单步）
- 对任意的$\l$-term $M,N,L$，如果$M\eqb N,N\eqb L$，那么$M\eqb L$；

可以看到，$\beta$-conversion满足自反、对称、传递，是$\Lambda$上的等价关系。多步$\beta$-reduction只满足自反和传递而不满足对称，这样的关系称为congruence关系。

下面的图片清晰展示了$\beta$-reduction和$\beta$-conversion之间的区别：图中一个箭头表示单步$\beta$-reduction，同一直线上的箭头可以连成一个多步$\beta$-reduction，而只要忽略箭头方向两个点之间连通就可以满足$\beta$-conversion。

<center><img src="https://blog-static.cnblogs.com/files/qixingzhi/beta_conversion.gif" alt="image-20250205014522060" style="zoom:33%;" /></center>

## Church-Rosser定理

每一步$\beta$-reduction会消去一个形如$(\l x.M)N$的subterm，所以随着$\beta$-reduction的进行一个term中的$\l$会越来越少直到无法再进行任何$\beta$-reduction。自然的问题是，在$\l$-calculus这个形式系统中，对于任何term，$\beta$-reduction是否会在有限步内结束，如果采取不同的顺序做$\beta$-reduction是否会导出唯一的“化简结果”？也就是我们要研究$\beta$-reduction的性质。

人们发现，$\beta$-reduction的性质很大程度上基于Church-Rosser定理：对于$\l$-term $M,N_1,N_2$，如果有$M\ttob N_1,M\ttob N_2$，那么一定存在$\l$-term $N_3$满足$N_1\ttob N_3,N_2\ttob N_3$。Church-Rosser定理可以用下面的图片清晰地展示：

<center><img src="https://blog-static.cnblogs.com/files/qixingzhi/church_rosser_thm.gif" alt="image-20250205015736469" style="zoom: 33%;" /></center>

### Church-Rosser定理的证明

为了方便讨论，我们把形如$(\l x M)N$的$\l$-term称为一个$\l$-redex（“形如”的意思是如果$\l$-term $Z$满足：存在$\l$-term $M,N$使得$Z\equiv (\l xM)N$），如果一个$\l$-term不存在任何$\l$-redex作为subterm就称它为一个$\beta$-normal form（简称$\beta$-nf）。

容易理解，一个$\l$-redex会被$\beta$-reduction“化简”，而$\beta$-normal form不能再继续化简。一个$\beta$-nf已经是“最简式”了：如果$M$是$\beta$-nf，那么对任意$N$，如果$M\ttob N$，则$M\equiv N$（归纳证明：如果$M\equiv N$显然；$M$走一个单步根据定义依然得到$M$，因此根据归纳假设走剩余的步依然得到$M$）。

（待续）

### Church-Rosser定理的推论

根据Church-Rosser定理我们可以得到以下结论：如果$M\eqb N$，那么存在$L$满足$M\ttob L,N\ttob L$。这一结论可以用下图直观展示。Church Rosser定理可知存在$L$满足$L_1\ttob L,L_2\ttob L$。

<center><img src="https://blog-static.cnblogs.com/files/qixingzhi/church_rosser_col1.gif" alt="image-20250205021639489" style="zoom: 33%;" /></center>

证明如下：依据$\eqb$的定义归纳。若$M\eqb N$是因为$M\ttob N$，那么取$L\equiv N$即可；若$M\eqb N$是因为$N\eqb M$，那么由归纳假设可证；若$M\eqb N$是因为存在$N'$使得$M\eqb N',N'\eqb N$，那么由归纳假设可以找到$L_1$满足$M\ttob L_1,N'\ttob L_1$，$L_2$满足$N'\ttob L_2,N\ttob L_2$。根据$N'\ttob L_1,N'\ttob L_2$。因此$M\ttob L,N\ttob L$。证毕。该证明可以由下面的图片清晰展示：

<center><img src="https://blog-static.cnblogs.com/files/qixingzhi/church_rosser_col1_pf.gif" alt="image-20250205022431151" style="zoom:33%;" /></center>

于是，我们就能证明一个$\l$-term至多只能“化简”得到一个$\beta$-nf：如果$M\eqb N_1,M\eqb N_2$且$N_1,N_2$是$\beta$-nf，那么$N_1\equiv N_2$。证明：由$\beta$-conversion的对称性与传递性可知$N_1\eqb N_2$，那么由上面的推论可知存在$L$使得$N_1\ttob L,N_2\ttob L$。而$N_1,N_2$是$\beta$-nf意味着它们已经是“最简式”，不能再由$\beta$-reduction箭头向下到达一个与其不相同的term，因此$N_1\equiv L,N_2\equiv L$，也即$N_1\equiv N_2$。证毕。

这样就回答了我们的问题，无论采取什么样的归约顺序我们都会得到一个唯一的最简式。如果两个$\l$-term之间能够做$\beta$-conversion（$=$），那么它们最终能$\beta$-reduce到同一个$\beta$-nf（根据上面的推论它们能归约到同一个term，这个term会被reduce到一个唯一的$\beta$-nf）。

从逻辑系统的角度看，这还能用来说明$\l$-calculus是一个一致(consistent)的系统：证明一致性，只需证明该系统存在一个无法证明的命题。由于存在不同的两个$\beta$-nf，比如真和假，$\l xy.x$和$\l xy.y$，一定有$\l xy.x\not\eqb \l xy.y$。否则它们能reduce到同一个$\beta$-nf，矛盾。

### Normalization Theorem

然而，一个$\l$-term的$\beta$-reduction有可能是不终止的（无穷次reduce）。仿照不动点定理的构造，可以令$\Omega=(\l x.xx)(\l x.xx)$，我们有$\Omega\tob \Omega$，而$\Omega$按照定义并不是一个$\beta$-nf，因此$\Omega$无法reduce到某个$\beta$-nf。

另一方面，每一步选择哪一个subterm做$\beta$-reduction是一个关键的问题。存在这样的情况，如果按照某一策略归约会无穷进行下去，而按照另一策略却是有穷的。例如，考虑$\textsf{KI}\Omega\equiv (\l xy.x)(\l x.x)((\l x.xx)(\l x.xx))$。如果选择归约$\textsf{K}$，那么我们将一步得到$\textsf{KI}\Omega\tob \textsf{I}$；如果选择归约$\Omega$，那么$\textsf{KI}\Omega\tob \textsf{KI}\Omega$，归约会无穷进行下去。所以在寻找$\beta$-nf时选择一个恰当的顺序是重要的，这通常称为归约的strategy(策略)。

可以证明，对于$\l$-term $M$，如果存在$\beta$-nf $N$满足$M\eqb N$，那么只需在每一步都选择对最左侧的$\beta$-redex做归约就可以由$M$归约得到$N$。这称为Normalization Theorem（归一化定理）。（证明略）。我们因此把$\l$-term的最左归约称为normalizing。





















