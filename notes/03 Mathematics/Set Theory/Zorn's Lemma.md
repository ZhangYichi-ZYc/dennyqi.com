---

title: Zorn's Lemma
date: 2024-09-10 02:29:00
categories: 数理逻辑
mathjax: true
katex: 
  enable: true 
  allpost: true
  copy_tex: true
description: 在偏序集$P$中，如果$P$的每一条链都有一个$P$中元素作为上界，那么$P$中存在极大元。Zorn's Lemma是集合论的ZF公理体系中选择公理的等价表述。

---

Zorn's Lemma陈述如下：在偏序集$P$中，如果$P$的每一条链都有一个$P$中元素作为上界，那么$P$中存在极大元。

## Proof

反证法，假如$P$中没有极大元。那么对于$P$的任意一条链$C\subseteq P$，我们一定能在$P\setminus C$中找到一个元素作为$C$的上界（如果不是这样，那么既然$C$一定有一个上界，这个上界只能在$C$内部。如果$C$是无穷的，那么这是不可能的；如果$C$是有穷的，那么这个上界就是$C$的末端点，$P$中没有元素比它大，说明这是一个极大元，矛盾）。我们<u>任取这样一个</u>可行的上界，记为$g(C)$（其中，$g$是由我们的选择给出的$\mathscr{Pow} \ (P)\to P$的映射。注意，这里我们假设了集合论中的选择公理(Axiom of Choice)成立）。

对于$P$的任意子集$S$，记$S_{ < a }=\{x\in S\mid x<a\}$。称链$C$是一条$g$链，如果$C$中不存在无穷下降的子链（i.e. $c_i\in C,c_1>c_2>\cdots>c_n>\cdots$）且$\forall a\in C,g(C_{ < a })=a$。

下面我们证明(Lemma 1)：如果$A,B$是两条不同的$g$链，那么$\exists b\in B$，$A=B_{ < b }$与$\exists a\in A$，$B=A_{ < a }$中至少有一个成立（这个Lemma想说，两条不同的$g$链一定一条包含另一条，偏序集中只有一条“完整的”$g$链）。记$C=\{c\in A\cap B\mid A_{ < c }=B_{ < c }\}$。那么$C\subseteq A$。如果$C\neq A$，那么考虑$A\setminus C$，$A\setminus C$是$A$的子链，它一定有最小元（设为$a$），不然就无穷下降了。那么$A_{ < a }$中没有任何$A\setminus C$中的元素，而$A_{ < a}\subseteq A$，因此$A_{ <a}\subseteq C$。此时考虑$C\setminus A_{ <a}$，如果其中存在元素$c$，那么$c\not\in A_{ < a}$，也即$c\geq a$。而$a\in A\setminus C$，因此$a\not\in C$，因此$a\not\in C\setminus A_{ < a }$，因此$a\neq c$。所以$c>a$，所以$a\in A_{ < c }$。而$c\in C$，因此$A_{ < c }=B_{ < c }$。而$\forall c'\in A_{ < c }$，若$c'<c$，则$A_{<c'}=B_{<c'}$，且$c'\in A\cap B$，因此$c'\in C$。所以$A_{ < c }\subseteq C$，这说明$a\in C$，矛盾。 综上，$C\neq A\implies C=A_{ < a }$。对称地，$C\neq B\implies C=B_{ < b }$，其中$b$是$B\setminus C$的最小元。设$C\neq A$且$C\neq B$，那么$C=A_{ < a }=B_{ < b }$。根据$g$链的定义，$g(A_{ < a })=a$，$g(B_{ < b })=b$，而$A_{ < a }=B_{ < b }$，所以$g(A_{ < a })=g(B_{ < b })$，因此$a=b$。而$a\in A,b\in B$，所以$a\in C$。而$a\in A\setminus C$，矛盾。因此$C=A$与$C=B$中有且仅有一个成立（因为$A\neq B$）。假如$C=A$，那么$C\neq B$，这推出$C=B_{ < b }$，可见$A=B_{ < b }$；假设$C=B$，那么$C\neq A$，这推出$C=A_{ < a }$，可见$B=A_{ < a }$。证毕。

把所有的$g$链收集进集合$G$，记$E=\bigcup\limits_{C\in G}C$（$E\in \mathscr{Pow} \ (P)$）。下面我们证明$\forall a\in E$，如果$A\in G$且$a\in A$，那么$A_{ < a }=E_{ < a }$(Lemma 2)（这个Lemma想说：$E$中每个元素都满足，所有比它小的元素恰好就是这个元素所在的$g$链中比它小的元素）。显然$A\subseteq E$，因此$A_{ < a }\subseteq E_{ < a }$。那么只需证$E_{ < a }\subseteq A_{ < a }$。$\forall x\in E_{ < a }$，存在$B\in G$使得$x\in B$。对$B$分类讨论，如果$B\subseteq A$，那么$x\in A_{ < a }$；如果$B\not\subseteq A$，那么$A\neq B$，由Lemma 1可知$\exists b\in B,A=B_{ < b }$与$\exists a\in A,B=A_{ < a }$中至少有一个成立。后者意味着$B\subseteq A$，矛盾，因此一定是前者成立。因为$a\in A$，于是$a\in B_{ < b }$，所以$a<b$。而$x<a$，因此$x<b$。因此$x\in B_{ < b }$。因此$x\in A$。而$x<a$，因此$x\in A_{ < a }$。综上，$E_{ < a }\subseteq A_{ < a }$。证毕。

下面证明$E$是链。$\forall a,b\in E$，存在$A\in G$使得$a\in A$，存在$B\in G$使得$b\in B$。由Lemma 1可知，两条$g$链必然有一条包含在另一条中。若$A\subseteq B$，则$a,b\in B$，因此可比较大小；若$B\subseteq A$，则$a,b\in A$，因此也可以比较大小。由此可见$E$中任意两个元素都可以比较大小，因此$E$是链。

下面证明$E$是$g$链。先证$E$没有无穷下降的子链。如果$E$有无穷下降的子链$a_1>a_2>\cdots$，设$a_1\in A$且$A\in G$，那么$\forall i>1,a_i<a_1$，因此$a_i\in E_{<a_1}$。由Lemma 2可知，$E_{<a_1}=A_{ < a }$。因此$a_i\in A_{ < a }$。这说明$A$有无穷下降的子链，与$A$是$g$链矛盾。再证$\forall a\in E,g(E_{ < a })=a$。设$a\in A,A\in G$，那么$g(A_{ < a })=a$。根据Lemma 2，$E_{ < a }=A_{ < a }$，因此$g(E_{ < a })=a$。

下面证明$F=E\cup \{g(E)\}$也是$g$链。$E$中元素可以两两比较大小，$g(E)$作为上界可以和所有$E$中元素比较大小，因此$F$中元素可以两两比较大小；因为$E$中不存在无穷下降的子链，因此加上一个元素后还是不存在无穷下降的子链；$\forall a\in E$，因为$E$是$g$链，$g(E_{ < a })=a$，而$(E\cup \{g(E)\})_{<g(E)}=E$，因此$g((E\cup \{g(E)\})_{<g(E)})=g(E)$。综上，$F$是$g$链。

$\forall E'\in \mathscr{Pow} \ (P)$，如果$E'$是$g$链，那么$E'\subseteq E$。而$F$是$g$链，可是$F\not\subseteq E$。矛盾。

Qed.

## Remark

上述证明过程用到了选择公理（给定一族集合，那么可以从每个集合中选一个元素组成一个新的集合）。事实上可以证明，在集合论的ZF公理体系下，如果承认除了选择公理以外的其它公理以及Zorn's Lemma，那么可以推出选择公理。这说明，Zorn's Lemma是集合论的ZF公理体系中选择公理的等价表述。

























