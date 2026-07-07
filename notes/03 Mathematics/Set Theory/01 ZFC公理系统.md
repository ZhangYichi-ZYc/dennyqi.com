## ZF公理

Zermelo-Frenkel(ZF)集合论公理包括九条公理，我们用一阶逻辑叙述，其中符号集为$S=\{\in\}$：

- 公理0：$\exists x(x\equiv x)$；
- 公理1：$\forall x \forall y \left( \forall z (z \in x \leftrightarrow z \in y) \rightarrow x \equiv y \right)$；
- 公理2（公理组）：$\forall z\forall w_1\cdots \forall w_n\exists y\forall x(x\in y\leftrightarrow x\in z \land \varphi)$，其中$n$为正整数，且公式$\varphi$的自由变量只可能包含$x,z,w_1,\cdots,w_n$；
- 公理3：$\forall x \forall y \exists z\left( x\in z\land y\in z \right)$；
- 公理4：$\forall x\exists y\forall z\forall u(u \in z\land z\in x\to u\in y)$；
- 公理5（公理组）：$\forall z\forall x_1\cdots \forall x_n((\forall x(x\in z\to\exists ^{=1}y\varphi))\to \exists v(\forall x(x \in z\to \exists y(y\in v\land \varphi))))$，其中$n$为正整数，且公式$\varphi$的自由变量只可能包含$x,y,x_1,\cdots,x_n$，$\exists ^{=1}y\varphi$是$\exists y\varphi\land \forall y'(\varphi\dfrac{y'}{y}\to y'\equiv y)$的缩写；
- 公理6：$\forall x \exists y \forall z\left( z\in y\leftrightarrow \forall w(w\in z\to w\in x)\right)$；
- 公理7：$\forall x(\exists y(y\in x)\to \exists y(y\in x \land \neg\exists z(z \in x\land z \in y)))$；
- 公理8：$\exists x(\varnothing\in x\land \forall y(y\in x\to y\cup \{y\}\in x))$；（符号$\varnothing\in x$和$y\cup\{y\}$都是简写，其含义将在后文定义）

在ZF公理下，我们认为一切数学对象都是集合。也即，集合就是满足这套公理的模型的论域中的元素。然而，根据斯科伦-勒文海姆定理，因为我们使用了符号集为有限集$\{\in\}$的一阶逻辑语言，这套公理一定存在一个论域可数的模型。但是我们又将看到，ZF公理可以推出描述“存在不可数集合”的公式。这就是斯科伦悖论(Skolem's paradox)，这个论域可数的集合可以看作ZF集合论的一个非标准模型。但是，我们很难确定集合论的“标准模型”是什么，因为“集合论”本身已经作为一种数学的根基而存在。因此，我们只从形式系统的角度讨论这些公理。下面我们对这些公理做出解释，这些解释不是在标准模型下的语义，而是对它们在形式证明中所起到的作用的一种“显示”。

公理0“$\exists x(x\equiv x)$”称为“存在公理(existence)”，它表明至少存在一个集合。

公理1“$\forall x \forall y \left( \forall z (z \in x \leftrightarrow z \in y) \rightarrow x \equiv y \right)$”称为“外延公理(extentionality)”，它使得我们要证明一个集合$x$“等于”另一个集合$y$时，只需从形式上证明$\forall z (z \in x \leftrightarrow z \in y)$。其中，“外延”这个词来源于哲学。一个概念的外延就是这个概念所适用的所有具体对象。例如按照弗雷格的函项理论，概念词“人”的外延就是所有能被填入“()是人”的括号内的对象。ZF集合论的外延公理告诉我们，集合$x$的外延就是全体满足$z\in x$的$z$，两个集合是“相等的”当且仅当它们的外延相等。

公理2称为“概括公理(comprehension)”，它为我们提供了由“性质”构造集合的方法。在自然语言中，这样的构造方法通常写为$\{x\mid \varphi(x)\}$。然而，在ZF中，这种构造方法被特别小心的对待。我们没有直接把概括公理写为$\exists y\forall x(x \in y\leftrightarrow \varphi)$，因为当$\varphi=\neg x\in x$时，会引发罗素悖论(Russell's paradox)：对于集合$y=\{x\mid \neg x \in x\}$，如果$y\in y$，那么$\neg y\in y$；如果$\neg y\in y$，那么$y\in y$。于是，$y\in y\leftrightarrow \neg y\in y$，于是公理系统就是不可满足的，因此导致不一致。依据概括公理，必须首先给定一个集合$z$，然后再用公式$\varphi$描述“子集关系”，这样才能用公式$\varphi$构造一个$z$的子集。这样，要使得集合$y=\{x\mid \neg x \in x\}$存在，必须首先存在一个$z$使得$\forall x(x\in y\to x\in z)$。如果ZF是一致的，这样一个$z$势必不存在。

依据概括公理，对任意集合$x$，存在$x$的一个子集$\{z\in x\mid x=x\}$，这个集合用符号记为$\{x\}$，称为包含$x$的单元集(singleton)。

取$\varphi=\neg x\equiv x$，由概括公理可知$\forall z\exists y\forall x(x\in y\leftrightarrow x\in z \land \neg x\equiv x)$。但是$\neg x\equiv x$始终为假。所以，存在一个集合$y$满足$\forall x(\neg x\in y)$。根据外延公理，这样一个集合是唯一的。所以依据ZF公理，存在一个唯一的集合不包含任何元素。把这个集合称为空集，记为$\varnothing$。“记为$\varnothing$”的含义是，任何一个带有$\varnothing$的公式都是另一个不带有$\varnothing$公式的缩写。对任何带有$\varnothing$的公式$\varphi$，它都是$\exists A((\forall x(\neg x\in A))\land \varphi\dfrac{A}{\varnothing})$的缩写。例如$y\equiv \varnothing$是$\exists A((\forall x(\neg x\in A))\land y\equiv A)$的缩写。

我们把符号$\subseteq$用于缩写。把$\forall x(x\in y\to x\in z)$缩写为$y\subseteq z$。

公理3“$\forall x \forall y \exists z\left( x\in z\land y\in z \right)$”称为“配对公理(pairing)”，它继概括公理以后又为我们提供了一种构造集合的方式。任给两个集合$x,y$，存在一个集合$z$又有$x$作为元素，又有$y$作为元素。依据概括公理，存在$z$的一个子集$\{u\in z\mid u=x\lor u=y\}$，也即存在一个集合有且仅有$x,y$作为元素。把这个集合用符号记为$\{x,y\}$。进而，$\{\{x\},\{x,y\}\}$也是一个集合。把$\{x,y\}$称为由$x,y$构成的无序对(unordered pair)，把$\{\{x\},\{x,y\}\}$称为由$x,y$构成的有序对(ordered pair)。用符号$\lang x,y\rang$表示$x,y$构成的有序对。

公理4“$\forall x\exists y\forall z\forall u(u \in z\land z\in x\to u\in y)$”称为“并集公理(union)”，它又提供了一种构造集合的方式。对于任意集合$x$，如果$x$的每个元素$z$都是包含若干元素$u$的集合，那么存在一个集合$y$包含了$x$的每个元素的元素。进而依据概括公理，可以写出恰好包含$x$的每个元素的元素的集合$\{u\in y\mid \exists z(z\in x \land u\in z)\}$。这个集合称为集合族$\{z\mid z\in x\}$的并集，记为$\bigcup \{z\mid z \in x\}$或$\bigcup\limits_{z\in x}z$。再次依据概括公理，还可以写出$x$的每个元素的共同元素的集合$\{u\in y\mid \forall z((z\in x)\to (u\in z))\}$，这个集合称为集合族$\{z\mid z\in x\}$的交集(intersection)，记为$\bigcap \{z\mid z \in x\}$或$\bigcap\limits_{z\in x}z$。对于无序对，我们引入符号$A\cup B$作为$\bigcup \{A,B\}$的缩写，$A\cap B$作为$\bigcap\{A,B\}$的缩写，$A\setminus B$作为$\{u\mid u\in A\land \neg u\in B\}$的缩写。

公理5称为“替换公理(replacement)”，它使我们可以依据“映射”来从定义域集合构造像集集合。对于任何给定的定义域$z$，如果对任意$x\in z$都存在唯一的$y$使得$f(x)=y$，那么存在集合$v$，它包含所有$f(x)$。根据概括公理，像集$\{y\mid \exists x\in z,y=f(x)\}$也存在。

对于任意两个集合$A,B$，任取$B$中的一个元素$y$，依据替换公理存在集合$\{z\mid \exists x \in A,z=\lang x,y\rang\}$。再应用一次替换公理，可以得到集合$\{z'\mid \exists y\in B,z'=\{z\mid \exists x\in A,z=\lang x,y\rang\}\}$。根据并集公理，得到集合$\bigcup\limits_{y\in B}\{z\mid \exists x\in A,z=\lang x,y\rang\}$，这也就等价于$\{\lang x,y\rang \mid x\in A\land y\in B\}$。这个集合称为集合$A,B$的笛卡尔积(cartesian product)，记为$A\times B$。

对于任意两个集合$A,B$，任意$A\times B$的子集$R\subseteq A\times B$称为一个二元关系(binary relation)。定义二元关系$R$的定义域(domain)为$\text{dom}(R):=\{x\mid \exists y\in B,\lang x,y\rang\in R\}$，二元关系$R$的值域(range)为$\text{ran}(R):=\{y\mid \exists x\in A,\lang x,y\rang\in R\}$。称$f$是一个$A$到$B$的函数，如果$f\subseteq A\times B$，$\text{dom}(f)=A$，$\text{ran}(f)\subseteq B$，且对于任意$x\in A$，存在唯一一个$y\in B$使得$\lang x,y\rang\in f$。如果$\forall x,y\in A$，$x\neq y\implies f(x)\neq f(y)$，就称$f$为单射(injection)；如果$\text{ran}(f)=B$，就称$f$为满射(surjection)。如果$f$既是单射又是满射，就称$f$为双射(bijection)。通常， 把$\lang x,y\rang \in R$简记为$xRy$。

把二元关系$R\subseteq A\times A$称为$A$上的严格偏序关系(strict partial ordering)，如果满足以下两条：

- 反自反性(irreflexivity)：$\forall x\in A$，$\neg xRx$；
- 传递性(transitivity)：$\forall x,y,z\in A$，$(xRy\land yRz)\implies xRz$；

把二元关系$R\subseteq A\times A$称为$A$上的非严格偏序关系(non-strict partial ordering)，如果满足以下三条：

- 自反性(irreflexivity)：$\forall x\in A$，$xRx$；
- 反对称性(antisymmetry)：$\forall x,y\in A,(xRy\land yRx)\implies x\equiv y$
- 传递性(transitivity)：$\forall x,y,z\in A$，$(xRy\land yRz)\implies xRz$；

对于严格偏序关系$R$，如果进一步满足下面这条，就称为严格全序关系(strict total ordering)：

- 三歧性(trichotomy)：$\forall x,y\in A,(xRy)\lor (yRx)\lor(x\equiv y)$；

对于非严格偏序关系$R$，如果进一步满足下面这条，就称为非严格全序关系(non-strict total ordering)：

- 全序性(totality)：$\forall x,y\in A,(xRy)\lor (yRx)$；三歧性(trichotomy)：$\forall x,y\in A,(xRy)\lor (yRx)\lor(x\equiv y)$；



