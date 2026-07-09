## 邻接矩阵的特征值

对于任意的无向图 $G=(V,E)$（假设不带边权），它可以用邻接矩阵 $A_G$ 来表示。$A_G$ 是一个对称矩阵，因此它一定有 $n$ 个实数特征值。我们把它们记为 $\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_n$。

比如，我们来解完全图 $K_n$ 的特征值。此时的邻接矩阵除了对角线以外是全 $1$ 的。我们当然可以采取解特征方程 $|A_G-\lambda I|=0$ 的方法来暴力解出特征值，但在这里我们有更简单的方法。我们立即观察到 $A_G x=\lambda x$ 在 $x$ 全 $1$ 时是成立的，因为乘以全 $1$ 的向量相当于给矩阵的每行求和，而此时矩阵每行的和都为 $n-1$。因此我们发现了特征向量 $(1,1,\cdots,1)$ 和特征值 $n-1$。如果存在其它的特征向量，那么它必须垂直于 $(1,1,\cdots,1)$，因为不同的特征子空间是正交的。这样的向量必须满足 $x_1+\cdots+x_n=0$，代入 $A_Gx$ 得到的向量正好是 $(-x_1,-x_2,\cdots,-x_n)$。因此我们又发现 $-1$ 是特征值，并且这个矩阵只有 $n-1$ 和 $-1$ 这两个特征值，不可能再有别的特征值了。

### 范数：$\lambda_1$ 与图的度数

$K_n$ 恰好是一个每个点度数都相等的图，也就是 $d$-regular graph。我们在上学期的线性代数课上其实已经证明过 $d$-regular graph 的最大特征值 $\lambda_1$ 就一定等于 $d$。当时我们用的方法直接深入到了底层的运算当中，用放缩和夹逼的方法证明了我们的结论。现在我们从更高的角度来给出一种更简单的证明方法，为了使用这种方法，我们首先要引入范数的概念。

向量的 $p$ 范数定义为 $\|x\|_p=\left(\sum\limits_{i=1}^{n}|x_i|^p\right)^\frac{1}{p}$，当 $p=0$ 时，特别地定义为非零位的个数。当 $p=1$ 时，这就是向量间的曼哈顿距离。当 $p=2$ 时，它就是我们最熟悉的 Euclid 距离。当 $p=+\infty$ 时，我们利用放缩和夹逼定理（我们将会看到这就是为什么"巧合地"我们在上学期的线性代数课的证明中也用到了放缩和夹逼）可以证明它就等于最大的 $|x_i|$，即 $\|x\|_\infty=\max\limits_{1\leq i\leq n}|x_i|$。所谓"范数"就是给出对象的一种长度的度量，$p$-范数是我们所熟悉的"Euclid 距离（$2$-范数）"的一般情形。

现在我们希望能给矩阵也定义一个"范数"。怎么理解矩阵的"长度"呢？我们知道矩阵对应着一个线性映射，因此我们把矩阵的范数定义为这个线性映射最多可以把某个向量拉长多少倍，而对向量长度的度量可以采用上面定义的向量的范数。因此矩阵的 $p$-范数就定义为 $\|A\|_p=\max\limits_{x}\dfrac{\|Ax\|_p}{\|x\|_p}$。由于 $x$ 的数乘不会影响放大的倍数，所以我们完全只需要取单位向量就能定义矩阵的范数了，所以它可以更简单地写为 $\|A\|_p=\max\limits_{\|\omega\|_p=1}\|A\omega\|_p$。基于这样的定义我们也直接地得到了一个不等式 $\forall x$，$\|A\|_p \geq \dfrac{\|Ax\|_p}{\|x\|_p}$，也就是 $\|Ax\|_p \leq \|A\|_p\|x\|_p$。

对于矩阵的无穷范数，可以直接计算得到一个简单的结果：由于 $\|A\|_\infty=\max\limits_{\|\omega\|_\infty=1}\|A\omega\|_\infty$，其中 $\|A\omega\|_\infty$ 就是指向量 $A\omega$ 中绝对值最大的那一个坐标，也就是 $A$ 中特定某一行与 $\omega$ 的内积的绝对值。而 $\|\omega\|_\infty=1$ 要求的就是最大那一维坐标的绝对值为 $1$，也就是每一维坐标的绝对值都不能超过 $1$，因此 $A\omega$ 的最大坐标一定不能超过 $A$ 中某一行元素的绝对值之和，而显然我们是可以取到这样一个 $\omega$ 使得 $A\omega$ 恰好就是这行元素的绝对值之和的。因此我们证明了 $\|A\|_\infty$ 就是 $A$ 的绝对值之和最大的那一行元素的绝对值之和，即 $\|A\|_\infty=\delta=\max\limits_{i}\sum\limits_{j=1}^{n}|A_{ij}|$。

由此可见，对于任意一个邻接矩阵，它的无穷范数就是图的最大度数，因为邻接矩阵的每一行的元素绝对值之和就是这个点的度数，其最大值就是图的最大度数。那么对于邻接矩阵 $A_G$，假设它的 $\lambda$ 对应特征向量 $x_0$，那么 $A_Gx_0=\lambda x_0$。两边同时取无穷范数，得 $\|A_Gx_0\|_\infty=\|\lambda x\|_\infty$。根据我们不等式放缩，左边 $\leq \|A_G\|_\infty\|x_0\|_\infty$，而右边就等于 $|\lambda| \cdot \|x_0\|_\infty$，同时约去 $\|x_0\|_{\infty}$，我们就得到了一个有趣的结论：$|\lambda| \leq \|A_G\|_{\infty}$。最大的特征值一定不超过图的最大度数！

那么我们就直接可以证明 $d$-regular 情形下的结论了。此时有 $|\lambda| \leq d$，而显然对于向量 $x=(1,1,\cdots,1)$ 来说一定满足 $A_Gx=dx$，因此最大的特征值就等于 $d$，即 $\lambda_1 =d$。

### 变分刻画：$\lambda_2$ 与图的连通性

根据对称矩阵一定有实数特征值，我们知道它一定可以对角化，因此一定可以写成谱分解的形式 $A = \sum\limits_{i=1}^{n}\lambda_iv_iv_i^\top$，其中 $v_1,\cdots,v_n$ 可以恰好形成 $\mathbb{R}^n$ 的一组标准正交基。有了这样的分解让我们的计算变得很方便。

我们可以把特征值的计算转化为最优化问题，这样刻画特征值的方法称为"变分刻画"。下面这个定理告诉我们 $\lambda_1 = \max\limits_{x \neq 0}\dfrac{\langle Ax,x\rangle}{\langle x,x\rangle}$，由于我们会反复用到这个结构，我们专门用一个符号 $R_A(x)$ 来表示 $\dfrac{\langle Ax,x\rangle}{\langle x,x\rangle}$（称为 Rayleigh Quotient）。我们在线性代数课上已经尝试过，把向量 $x$ 按照我们的标准正交基分解 $x=c_1v_1 +\cdots+c_nv_n$，那么很容易写出 $\langle x,x\rangle=\left(\sum\limits_{i=1}^{n}c_iv_i\right)\left(\sum\limits_{i=1}^{n}c_iv_i\right)=\sum\limits_{i=1}^{n}c_i^2v_i^2=\sum\limits_{i=1}^{n}c_i^2$。把 $A$ 做谱分解，乘上做了正交分解的 $x$，得到 $Ax=\left(\sum\limits_{i=1}^{n}\lambda_iv_iv_i^\top\right)\left(\sum\limits_{i=1}^{n}c_iv_i\right)=\sum\limits_{i=1}^{n}\lambda_ic_iv_i$，因此 $\langle Ax,x\rangle=\left(\sum\limits_{i=1}^{n}\lambda_ic_iv_i\right)\left(\sum\limits_{i=1}^{n}c_iv_i\right)=\sum\limits_{i=1}^{n}\lambda_i c_i^2$。所以 $\dfrac{\langle Ax,x\rangle}{\langle x,x\rangle}=\dfrac{\sum\limits_{i=1}^{n}\lambda_i c_i^2}{\sum\limits_{i=1}^{n}c_i^2}$，我们要找出它的最大值。我们发现分母是个常数，如果把它写成 $\sum\limits_{i=1}^{n}\left(\dfrac{c_i^2}{\sum\limits_{i=1}^{n}c_i^2}\right)\lambda_i$ 的形式，我们发现它刚好构成了 $\lambda_i$ 的一个<u>分布</u>（因为系数之和加起来是个常数 $1$）。对于这样一个可以任意选择系数的分布，为了让它尽量大当然是把所有的系数都分配给 $\lambda_1$。这意味着 $c_2,c_3,\cdots,c_n$ 全都取 $0$，所以我们证明了 $\max\limits_{x \neq 0}\dfrac{\langle Ax,x\rangle}{\langle x,x\rangle}=\lambda_1$，当 $x=c_1v_1$ 时取到最大值。

那么如何表示 $\lambda_2$ 呢？依然考虑 $\sum\limits_{i=1}^{n}\left(\dfrac{c_i^2}{\sum\limits_{i=1}^{n}c_i^2}\right)\lambda_i$ 这个式子，如果我们限制 $x$ 必须垂直于 $v_1$，那么也就是 $(c_1v_1+\cdots+c_nv_n)v_1=0$，那么就相当于直接限制了 $c_1$ 必须等于 $0$。在这种情况下考虑 $R_A(x)$ 的最大值，其结果就是把所有系数都分配给 $\lambda_2$ 了，因此得出结论 $\lambda_2 = \max\limits_{x \perp v_1}R_A(x)$。依此类推，$\lambda_3=\max\limits_{x \perp v_1,v_2} R_A(x)$。一般地，$\lambda_k=\max\limits_{x \perp v_1,\cdots,v_{k-1}}R_A(x)$。也就是求任何一个特征值都可以转化为在一定限制条件下求 $R_A(x)$ 的最大值的问题。

我们也可以倒过来，由于当我们用最大值表示 $\lambda_n$ 时，$x$ 必须垂直于 $v_1,\cdots,v_{n-1}$ 所有这些向量，这意味着 $x$ 只能和 $v_n$ 共线，也就是我们把系数全都分配给了最后一个 $\lambda$。这等价于 $\lambda_n=\min\limits_{x \neq 0} R_A(x)$。倒着推回来，就有 $\lambda_{k}=\min\limits_{x \perp v_{k+1},\cdots,v_n}R_A(x)$。

我们还可以用 min-max 来写出特征值：$\lambda_k = \max\limits_{\dim(V)=k} \min\limits_{x \in V} R_A(x)$。因为外层我们为了最大化一定会选择 $v_1,\cdots,v_{k}$ 张成的子空间，而内层的最小值又会迫使我们把所有的系数都分配给最后一个向量，也就是 $v_k$。

现在回到 $d$-regular graph 中。我们在线性代数课上已经证明过特征值 $d$ 在特征方程中的重数就等于图的连通块的个数。因此 $\lambda_2$ 是否等于 $d$ 刻画的就是图是否是一个连通图。下面我们就用我们的变分刻画来再次验证这件事。$\lambda_2 = \max\limits_{x \perp v_1}R_A(x)$，而在 $d$-regular graph 中，$A_G v_1=dv_1$ 要求 $v_1$ 的方向就是 $(1,1,\cdots,1)$。所以有 $x_1+x_2+\cdots+x_n=0$。$R_A(x)=\dfrac{\langle Ax,x\rangle}{\langle x,x\rangle}$，其中分母就是 $\sum\limits_{i=1}^{n}x_i^2$，分子是二次型 $x^\top Ax$，它恒等于 $\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{n}A_{ij}x_ix_j$，在邻接矩阵上 $A_{ij}$ 表示的是 $(i,j)$ 这条边是否存在，因此可以把它写作 $\sum\limits_{(i,j) \in E}x_ix_j$。（注意我们枚举的是有序数对 $(i,j)$）这样就有 $R_A(x)=\dfrac{\sum\limits_{(i,j) \in E}x_ix_j}{\sum\limits_{i=1}^{n}x_i^2}$。我们把 $d$ 与它作差，

$$
d-R_A(x)=\dfrac{\sum\limits_{i=1}^{n}dx_i^2-\sum\limits_{(i,j) \in E}x_ix_j}{\sum\limits_{i=1}^{n}x_i^2}
$$

由于图是 $d$-regular 的，对于每个固定的 $i$ 恰好只有 $d$ 个 $j$ 保证 $\{i,j\} \in E$，因此我们把 $dx_i^2$ 拆成 $d$ 个分配给每个 $j$，分子就等于 $\sum\limits_{i=1}^{n}\sum\limits_{(i,j)\in E}x_i(x_i-x_j)$。其中对于每条"单方向的"边 $(i,j)$，分别会产生一个 $x_i^2$ 和一个 $-x_ix_j$，因此如果把两个方向综合起来每条边恰好产生 $x_i^2+x_j^2-2x_ix_j=(x_i-x_j)^2$。综上分子可以写成 $\sum\limits_{\{i,j\} \in E} (x_i-x_j)^2$。我们注意我们的条件是要使得在 $\sum\limits_{i=1}^{n}x_i=0$ 的前提下 $R_A(x)$ 取最大值，因此也就是让 $\sum\limits_{\{i,j\} \in E} (x_i-x_j)^2$ 取最小值。我们自然希望所有 $x_i$ 都取相同的值，这样它就能取到 $0$ 了，没有值能比它更小了，因为它是非负的。这个式子为 $0$ 意味着图上的每个连通块内的 $x_i$ 都必须取相同的值，这是因为我们会沿着边延拓，上式为 $0$ 要求每条边两端的点取值都要相等。如果整个图都是连通的，那么所有的 $x_i$ 最终都有相同的取值，这样 $x$ 就与 $v_1$ 平行了，显然不满足我们的要求。因此如果整张图都连通，必然有 $d-R_A(x)>0$，即 $\lambda_2<d$。而如果整张图不是连通的，那么它取 $0$ 就变得可能了，此时有 $\lambda_2=d$。

类似地方法我们可以证明，如果图有 $k$ 个连通分量，那么最大的 $k$ 个特征值都是 $d$，这与我们在线性代数课上的得到的结论是相同的，不再赘述。另外，利用 $\lambda_n=\min\limits_{x \neq 0}R_A(x)$，我们也可以证明 $\lambda_n=-d$ 当且仅当原图是二分图（$d$-regular 的连通图前提下）：因为

$$
\lambda_n+d=\min \dfrac{\sum\limits_{i=1}^{n}dx_i^2+\sum\limits_{(i,j) \in E}x_ix_j}{\sum\limits_{i=1}^{n}x_i^2}
=\min \dfrac{\sum\limits_{\{i,j\} \in E} (x_i+x_j)^2}{\sum\limits_{i=1}^{n}x_i^2}
$$

如果它等于 $0$ 那么所有边都要有 $x_i=-x_j$，这等价于图能黑白染色，这是二分图的充要条件；而二分图显然可以取这样的 $x$ 使它两两异号，这样我们就证完了。

对于非 $d$-regular 的图，我们利用变分刻画可以给出 $\lambda_1$ 与平均度数之间的关系：既然

$$
\lambda_1=\max\limits_{x \neq 0}R_A(x)=\dfrac{\sum\limits_{(i,j) \in E}x_ix_j}{\sum\limits_{i=1}^{n}x_i^2}
$$

那么取 $x_0=(1,1,\cdots,1)$，一定有 $\lambda_1 \geq R_A(x_0)$。对于 $R_A(x_0)$，它的分母即为 $n$，分子是整张图边数的两倍，可以写成所有点的度数和 $\sum\limits_{i=1}^{n}\deg(i)$。所以 $R_A(x_0)$ 就是平均度数 $d_{\text{avg}}$。我们得到了结论 $\lambda_1 \geq d_{\text{avg}}$。

## 拉普拉斯矩阵：一般化到带权图

现在假设我们的图是带权（权值非负）的，并且允许存在自环。此时我们把一个点的度数定义为所有与它相连的边的权值之和。通过把第 $i$ 个点的"度数"放在矩阵的第 $i$ 行 $i$ 列，其余位置都为 $0$，我们构造出一个矩阵 $D_G$。用 $D_G$ 减去带权的邻接矩阵 $A_G$ 得到的矩阵记为 $L_G$，称为拉普拉斯矩阵（它实际上是离散版本的拉普拉斯算子）。

一个普通的不带边权的 $d$-regular graph 的拉普拉斯矩阵是什么样的呢？此时，$D_G=dI$，因此 $L_G=dI-A_G$。假设 $A_G$ 有特征值 $\lambda_i$ 与相应的特征向量 $x_i$，那么 $A_Gx_i=\lambda_i x_i$，而 $dIx_i=dx_i$，因此

$$
L_Gx_i=dIx_i-A_Gx_i=dx_i-\lambda_ix_i=(d-\lambda_i)x_i
$$

所以我们立即找到了 $L_G$ 的所有特征向量与特征值：$\{d-\lambda_i\}$。我们记 $\mu_i=d-\lambda_i$，则有 $\mu_1 \leq \cdots \leq \mu_n$（注意它是从小到大的）。而我们知道对于 $d$-regular graph，$\lambda_1=d$，因此 $\mu_1=0$。也就是说 $d$-regular graph 的拉普拉斯矩阵的最小特征值是 $0$。

而我们将会发现，对于一般化的带权图，同样满足拉普拉斯矩阵的最小值为 $0$。如果我们取全 $1$ 向量 $x_0$，那么 $L_Gx_0=D_Gx_0-A_Gx_0$，其中前者每一项就是"度数"，后者每一项是对邻接矩阵的每一行求和，恰好也等于度数，因此 $L_Gx_0=0=0 \cdot x_0$，也就是 $0$ 确实是一个特征值。因此我们只需证明 $\mu_1 \geq 0$。我们发现 $L_G$ 依然是一个对称矩阵，因此对于 $L_G$ 我们也有 $\mu_1=\min\limits_{x \neq 0}\dfrac{\langle x,L_Gx\rangle}{\langle x,x \rangle}$。为此，我们先来计算一下 $L_G$ 在一般带权图上的二次型，它正好有一个很简单的形式

$$
\langle x,L_G x\rangle=\sum\limits_{\{i,j\} \in E}w_{ij}(x_i-x_j)^2
$$

（注意这里的 $\{i,j\}$ 是不考虑顺序的）。下面我们就来验证这一点。对右侧展开并把交叉项和平方项分开，得到

$$
\sum\limits_{\{i,j\} \in E}w_{ij}(x_i^2+x_j^2)-2\sum\limits_{\{i,j\} \in E}w_{ij}x_ix_j
$$

前者等于 $\sum\limits_{i}x_i^2\sum\limits_{\{i,j\} \in E,j \neq i}w_{ij}+\sum\limits_{i}x_i^2w_{ii}$。而 $\sum\limits_{\{i,j\} \in E,j \neq i}w_{ij}$ 正是我们定义的 $i$ 点的"度数" $w_i$。而 $2\sum\limits_{\{i,j\} \in E}w_{ij}x_ix_j$ 可以写成 $\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{n}w_{ij}x_ix_j+\sum\limits_{i=1}^{n}w_{ii}x_i^2$，因为当我们分开枚举 $i,j$ 是对角线上的元素只会被算一遍。综上

$$
\sum\limits_{\{i,j\} \in E}w_{ij}(x_i-x_j)^2
=\sum\limits_{i}x_i^2w_i+\sum\limits_{i}x_i^2w_{ii}-\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{n}w_{ij}x_ix_j-\sum\limits_{i=1}^{n}w_{ii}x_i^2
=\sum\limits_{i}x_i^2w_i-\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{n}w_{ij}x_ix_j
$$

它正好分别是 $D_G$ 矩阵与 $A_G$ 矩阵的二次型，因此我们证明了

$$
\sum\limits_{\{i,j\} \in E}w_{ij}(x_i-x_j)^2=x^\top D_Gx-x^\top A_G x=x^\top (D_G-A_G)x=\langle x,L_G x\rangle
$$

由于我们假定了权值非负，因此这个和一定是非负的。这就说明 $0$ 就是最小的特征值。

## Reversible Matrix

一个无向图可以看作一种特殊的有向图，只要把它的每条无向边拆成两条有向边。对于任意一个带权的图，我们都可以这么做。现在我们对我们得到的图进行一些修改，使得我们能从概率的角度理解它，因为这么做会为我们带来很多直观。

对于每个点 $i$，我们把从它出发的有向边都除以它的度数 $w_i$（即所有这些边的权值之和），于是所有这些边的和现在变成了 $1$。这样，从 $i$ 出发的一条边的权值可以理解为选择这条边的"概率"。如果起始点是随机的，并且有 $\pi(i)$ 的概率调到节点 $i$，那么走一步以后到达某个点 $i$ 的概率是多大？我们枚举起点求和，得到

$$
\Pr[i]=\sum\limits_{j=1}^{n}\pi(j) \cdot \dfrac{w_{ji}}{w_j}
$$

如果我们规定挑中 $i$ 当起点的概率 $\pi(i)$ 是按照权值分布的，也即 $\pi(i)=\dfrac{w_i}{\sum\limits_{k} w_k}$，记 $\sum\limits_{k}w_k=W$，那么我们的求和可以写作

$$
\Pr[i]=\sum\limits_{j=1}^{n}\dfrac{w_j}{W}\cdot\dfrac{w_{ji}}{w_j}
=\dfrac{\sum\limits_{j=1}^{n}w_{ji}}{W}
$$

而分子等于 $\sum\limits_{j=1}^{n}w_{ij}$，因此等于 $w_i$，于是恰好 $\Pr[i]=\pi(i)$。所以我们可以从随机游走的角度理解新的这张图：如果按照度数为权值来选择起点，按照边权来随机选择一条边，我们走一步以后到达每个点的概率依然是以度数为权值的概率分布，因此在这样的初始条件下我们已经得到了走任意步以后到达每个点的概率分布，它就是度数分布。

我们通过除以每个点的度数得到的新的邻接矩阵记为 $P$，不幸的是它不再是一个对称矩阵了。但它也不是那么地不对称，只需要给每一行补乘上一个常数（就是我们给每行除掉的度数），它就再次是对称的了。这样的矩阵称为是 reversible 的。它的一大好处在于，当我们计算它的拉普拉斯矩阵的时候由于每行的和都是定值 $1$，$D_G$ 就是单位矩阵。所以有 $L=I-P$。既然 $I$ 不会影响对称性，所以 $L$ 也是一个 reversible matrix。我们想把刚才得到的关于谱图的性质推广到这样有点对称而又不那么对称的 reversible matrix 上。

对于这样的 reversible matrix $P$，如果定义

$$
\Pi=\begin{bmatrix}\pi(1) & 0 & \cdots & 0\\
0 & \pi(2) & \cdots & 0\\
0 & 0 & \ddots & 0\\
0 & 0 & \cdots & \pi(n)\end{bmatrix}
$$

那么我们可以证明 $\Pi^{1/2} P \Pi^{-1/2}$ 一定是对称矩阵，记为 $Q$。其中，矩阵的幂是这样定义的：我们知道对角化后 $A=U\Lambda U^{-1}$，那么 $A^2=U\Lambda U^{-1}U\Lambda U^{-1}$，消去中间的互逆矩阵，而对角矩阵相乘就是每一项相乘，所以 $A^2=U\Lambda^2U^{-1}$，因此一般地 $A^n=U\Lambda^n U^{-1}$，即只需把特征值修改为原来的 $n$ 次方。把这样的结果延拓到实数，作为矩阵幂次的定义。在这里 $\Pi$ 本身就是对角矩阵了，因此 $U$ 是单位向量，所以 $\Pi^{1/2}$ 就是对角线上每个元素都开根号。$-1/2$ 同理。把它理解为二次型那样的展开，那么

$$
Q(i,j)=P(i,j) \cdot \dfrac{\sqrt{\pi(i)}}{\sqrt{\pi(j)}}
$$

$$
Q(j,i)=P(j,i) \cdot \dfrac{\sqrt{\pi(j)}}{\sqrt{\pi(i)}}
$$

要验证 $Q(i,j)=Q(j,i)$，代入 $P(i,j)=\dfrac{A_G(i,j)}{w_i}$，两边平方后化简开根号，只需验证 $\pi(i)w_j=\pi(j)w_i$，显然成立。

既然 $Q$ 是对称矩阵，那么它可以做谱分解 $Q=\sum\limits_{i=1}^{n}\lambda_i u_iu_i^\top$，而 $Q=\Pi^{1/2} P \Pi^{-1/2}$。于是

$$
P=\Pi^{-1/2} Q \Pi^{1/2}
=\Pi^{-1/2}\left(\sum\limits_{i=1}^{n}\lambda_i u_iu_i^\top\right)\Pi^{1/2}
$$

根据分配律

$$
P=\sum\limits_{i=1}^{n}\lambda_i \Pi^{-1/2}u_iu_i^\top\Pi^{1/2}
$$

令 $\Pi^{-1/2}u_i=:v_i$，那么 $v_i^\top=u_i^\top(\Pi^{-1/2})^\top = u_i^\top \Pi^{-1/2}$。所以

$$
P=\sum\limits_{i=1}^{n}\lambda_i v_iv_i^\top\Pi
$$

我们发现，所有的 $v_j$ 就是 $P$ 的特征向量，因为

$$
Pv_j=P=\sum\limits_{i=1}^{n}\lambda_i \Pi^{-1/2}u_iu_i^\top\Pi^{1/2} v_j
=\sum\limits_{i=1}^{n}\lambda_i \Pi^{-1/2}u_iu_i^\top\Pi^{1/2} (\Pi^{-1/2}u_j)
=\sum\limits_{i=1}^{n}\lambda_i \Pi^{-1/2}u_iu_i^\top u_j
=\lambda_j\Pi^{-1/2}u_j=\lambda_j v_j
$$

并且我们还顺便验证了对应的特征值就是 $Q$ 的特征值 $\lambda_j$，$P$ 的特征值和 $Q$ 是完全相同的。

但可惜的是 $v_i,v_j$ 并不两两正交，

$$
v_i^\top v_j=(\Pi^{-1/2}u_i)^\top \Pi^{-1/2}u_j
=u_i^\top \Pi^{-1}u_j
=\sum\limits_{k=1}^{n}[\pi(k)]^{-1}u_i(k)u_j(k)
$$

我们只知道 $u_i^\top u_j=0$，因此并不能保证 $v_i^\top v_j$ 也为 $0$。我们"希望它能是正交的"，这样我们才能方便地讨论特征空间。所以我们把向量的内积定义修改为 $\langle v_i,v_j\rangle_\Pi=v_i^\top \Pi v_j$。于是

$$
\langle v_i,v_j\rangle
=u_i^\top \Pi^{-1/2}\Pi \Pi^{-1/2}u_j
=u_i^\top u_j=0
$$

也就是我们找到了 $P$ 的一组加权意义下的特征空间的标准正交基。

于是我们就可以把先前涉及到内积的讨论全都替换为这种形式的内积，从而完成所有的谱图的性质在 reversible matrix 上的推广。对于它的拉普拉斯矩阵 $L=I-P$，依然满足特征值 $\gamma_1 \leq \gamma_2 \leq \cdots \leq \gamma _n$ 中，最小值 $\gamma_1$ 恒为 $0$，最大值 $\gamma_n \leq 2$（因为特征值的绝对值不超过最大度数，在这里是 $1$，经过单位矩阵的减法以后不超过 $2$）。我们还知道 $\gamma_2=0$ 当且仅当图是不连通的。

## Cheeger 不等式

"$\gamma_2=0$ 当且仅当图是不连通"只是对图的连通性的一个相对粗浅的描述。人们发现，图的连通性可以被 $\gamma_2$ 更精确地描述。一个图假如是类似完全图那样的具有四通八达的连通性，我们认为它的连通性比较"好"；而一个图如果是两个完全图中间由寥寥几条"桥"相连，也就是有一些边是连通性的瓶颈，那么我们认为它的连通性"不太好"。图的 Expansion 就是用来定量描述图的连通性的概念。对于图上的点集 $S$，记

$$
\varphi(S)=\dfrac{\sum\limits_{i \in S, j \notin S}\pi(i)P(i,j)}{\sum\limits_{i \in S}\pi(i)}
$$

从随机游走的意义上理解它表示当我们随机降落在 $S$ 中的一个点上时，走一步能够走出 $S$ 的概率。这个概率越小说明 $S$ 受到瓶颈的限制越大，图的连通性越差。由此定义图的 Expansion 为

$$
\phi(G)=\min\limits_{S \subseteq V} \varphi(S)
$$

注意在这个定义过程中我们要求 $S$ 必须满足 $\pi(S) \leq \dfrac{1}{2}$，否则对于所有的 $S$ 其补集也会产生一个 $\varphi(\bar{S})$，它们的分母之和为 $1$ 而分子相同，所以分子大的那个一定更小，我们取更小的那个分母才能更好地反映出我们想要的"expansion"的性质。

Cheeger 不等式指出：

$$
\dfrac{\gamma_2}{2} \leq \phi(G) \leq \sqrt{2\gamma_2}
$$

这体现出 $\phi(G)$ 正是被 $\gamma_2$ 控制着的。

先证左侧不等式。根据变分刻画，

$$
\gamma_2=\min\limits_{\dim(T)=2}\max\limits_{x \in T \setminus\{0\}} \dfrac{\langle x,Lx\rangle_\Pi}{\langle x,x\rangle_\Pi}
$$

我们要证明它小于某个值，可以取出一个特殊的 $T_0$，这样一定有放缩

$$
\gamma_2 \leq \max\limits_{x \in T_0 \setminus\{0\}} \dfrac{\langle x,Lx\rangle_\Pi}{\langle x,x\rangle_\Pi}
$$

取怎么样的 $T_0$ 比较好呢？根据我们之前得到的展开，

$$
\dfrac{\langle x,Lx\rangle_\Pi}{\langle x,x\rangle_\Pi}
=\dfrac{\sum\limits_{\{i,j\} \in E}\pi(i)P(i,j)(x(i)-x(j))^2}{\langle x,x\rangle_\Pi}
$$

我们想取的 $T_0$ 应该是尽可能小的，不然就背离了我们想用 $\gamma_2$ 反应连通性的初衷。如果 $x(i),x(j)$ 中的大部分都被抵消，只在少数"瓶颈"上保留下来，那么这就是一个理想的空间。所以对于能够取到 $\phi(G)$ 的某个 $\varphi(S_0)$，我们构造两个 $n$ 维向量，一个向量只有在 $S_0$ 内的节点上取 $1$ 其它取 $0$，另一个向量只在 $S_0$ 内的节点上取 $0$ 其它取 $1$，这两个向量张成一个二维子空间（换言之这个空间里的向量以 $S_0$ 的分布"整块地"取值，记为 $x=a\cdot\mathbb{1}_{S_0}+b\cdot\mathbb{1}_{\overline S_0}$），就令它为 $T_0$。于是

$$
\dfrac{\langle x,Lx\rangle_\Pi}{\langle x,x\rangle_\Pi}
=\dfrac{\sum\limits_{i \in S_0, j \in \overline S_0}\pi(i)P(i,j)(a-b)^2}{\sum\limits_{i \in S_0}\pi(i)a^2+\sum\limits_{i \in \overline S_0}\pi(i)b^2}
$$

由于 $(a-b)^2 \leq 2a^2+2b^2$，所以它小于等于

$$
\dfrac{2a^2\sum\limits_{i \in S_0, j \in \overline S_0}\pi(i)P(i,j)+2b^2\sum\limits_{i \in S_0, j \in \overline S_0}\pi(i)P(i,j)}{a^2\sum\limits_{i \in S_0}\pi(i)+b^2\sum\limits_{i \in \overline S_0}\pi(i)}
$$

根据糖水不等式它小于等于 $\max \{2\varphi(S_0),2\varphi(\overline S_0)\}$，根据我们的定义我们就已经证明了 $\gamma_2 \leq 2 \phi(G)$。

对右式的证明用到了"Fiedler 算法"，它指出任给一个向量 $x$，把它的各个分量从小到大排序以后，我们找到一个使得 $\varphi(S_k)$ 取得最小值的 $S_k$，其中 $S_k=\{1,2,\cdots,k\}$，一定成立 $\varphi(S_k) \leq \sqrt{2R_L(x)}$，可见当 $x$ 取特征向量 $v_2$ 时我们就证明了 $\varphi(S_k) \leq \sqrt{2\gamma_2}$。这个算法的正确性证明用到了魔法一般的概率方法，在此就不写出了。

## Cauchy 交错定理

如果 $n$ 个节点的无向图 $G$ 的邻接矩阵有特征值 $\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_n$。此时我们删掉 $G$ 上的某一个节点 $k$ 得到图 $H$，对应地相当于在原来的邻接矩阵里删掉第 $k$ 行与第 $k$ 列，这个新的矩阵有特征值 $\mu_1 \geq \mu_2 \geq \cdots \geq \mu_{n-1}$。Cauchy 交错定理指出，这些特征值一定满足一个交错的关系：

$$
\lambda_1 \geq \mu_1 \geq \lambda_2 \geq \mu_2 \geq \cdots \geq \lambda_{n-1} \geq \mu_{n-1} \geq \lambda_n
$$

如果在 $H$ 的基础上再删一个点得到 $\gamma_1 \geq \cdots \geq \gamma_{n-2}$，那么一定满足 $\mu_1 \geq \gamma_1 \geq \cdots \geq \gamma_{n-2} \geq \mu_{n-1}$。根据 $\lambda_1 \geq \mu_1 \geq \gamma_1 \geq \mu_2 \geq \lambda_3$ 可以推出 $\lambda_1 \geq \gamma_1 \geq \lambda_3$。还有 $\lambda_2 \geq \gamma_2 \geq \lambda_4$ 等等。依此类推，当我们在 $n$ 个点的图（假设特征值为 $\lambda_i$）上删去若干个点得到一个 $m$ 个点的图（假设特征值为 $\mu_i$）时，对于任意的 $k$ 都有 $\lambda_k \geq \mu_k \geq \lambda_{k+n-m}$。

下证 $\lambda_k \geq \mu_k$。不妨假设我们删除的是第 $n$ 个点。根据变分刻画，

$$
\lambda_k=\max\limits_{S \subseteq \mathbb{R}^n \land \dim(S)=k}\min\limits_{x \in S \setminus\{0\}} \dfrac{\langle x,A_Gx\rangle}{\langle x,x\rangle}
$$

$$
\mu_k=\max\limits_{T \subseteq \mathbb{R}^{n-1} \land \dim(T)=k}\min\limits_{y \in T \setminus\{0\}} \dfrac{\langle y,A_Hy\rangle}{\langle y,y\rangle}
$$

由于 $y$ 是 $n-1$ 维向量，我们给它在最后一位补上 $0$ 得到 $y'$，那么它就相当于是 $n$ 维向量了。因此 $\mu_k$ 中的子空间 $T$ 可以看作是 $S$ 的一部分，而我们又能一眼看出实际上

$$
\dfrac{\langle y,A_Hy\rangle}{\langle y,y\rangle}
=\dfrac{\langle y',A_Gy'\rangle}{\langle y',y'\rangle}
$$

所以两个刻画中我们其实是在操作同一个对象，只不过 $\lambda_k$ 中我们允许涵盖更广的子空间，因此显然有 $\lambda_k \geq \mu_k$。

$\lambda_{k+1} \leq \mu_k$ 是完全同理的。我们对矩阵取负号，对于 $-A_G$ 有特征值 $-\lambda_n \geq -\lambda_{n-1} \geq \cdots \geq \lambda_1$，对于 $-A_H$ 有 $-\mu_{n-1} \geq -\mu_{n-2} \geq \cdots \geq \mu_1$。既然 $-A_H$ 可以看作是 $-A_G$ 删除了第 $n$ 个点，那么套用刚才的结论我们已经证明了 $-\lambda_k \geq -\mu_{k-1}$，即 $\lambda_k \leq \mu_{k-1}$。

### 最大独立集，染色数

假设 $A_G$ 中正的特征值个数为 $n^+$，负的特征值个数为 $n^-$。设最大独立集的点集为 $S$，如果我们把原图删得只剩 $S$，那么这个子图是一个空图，它的 $|S|$ 个特征值全都为 $0$。那么根据 Cauchy 交错定理得到 $\lambda_k \geq 0 \geq \lambda_{k+|G|-|S|}$，$\forall 1 \leq k \leq |S|$。所以 $\lambda_1$ 到 $\lambda_{|S|}$ 都大于等于 $0$ 的。因此 $n^- \leq n-|S|$。再用同样的技巧，对邻接矩阵取负号，得到 $-\lambda_k \geq 0 \geq -\lambda_{k+|G|-|S|}$，$\forall 1 \leq k \leq |S|$，因此 $n^+ \leq n-|S|$。综上 $|S| \leq \min\{n-n^+,n-n^-\}$，也就是我们仅仅通过判断特征值的正负号就可以给出一个最大独立集的上界。

对于图的染色数，我们可以给出一个上界 $d_{max}+1$。因为我们贪心地从某个点出发染色，每个相邻点都染不同颜色，可以时刻保证图上没有冲突。我们可以用特征值来加强这个上界，因为我们证明过 $d_{avg}\leq \lambda_1 \leq d_{max}$。现在我们要证明 $\chi(G) \leq \lfloor \lambda_1\rfloor+1$。我们用归纳法证明，当 $n=1$ 时显然成立。对于图 $G$，我们删去度数最小的点 $v$，得到子图 $H=G \setminus v$。对于 $v$ 以及所有与 $v$ 相邻的点，需要的染色数为 $d_v+1$，它小于等于 $d_{avg}+1$，因此也小于等于 $\lfloor\lambda_1\rfloor+1$。而对于 $H$ 可以用归纳假设（设它的特征值为 $\mu$）得到 $\chi(H) \leq \lfloor \mu_1\rfloor+1$，因此 $\chi(H) \leq \lfloor\mu_1\rfloor+1 \leq \lfloor\lambda_1\rfloor+1$（因为 $\mu_1+1 \leq \lambda_1+1$，取整函数不会改变不等号）。这意味着在染完 $v$ 周围的节点（同时保证它们颜色互不相同）的情况下我们可以用不超过 $\lfloor\lambda_1\rfloor+1$ 种颜色把整个 $G$ 都染完。而既然染色数一定是整数，因此得到 $\chi(G) \leq \lfloor \lambda_1\rfloor+1$。

## 敏感度猜想

理论计算机的问题最后都可以归结到布尔函数的问题，我们的研究就是围绕函数 $f:\{-1,1\}^n \to \{0,1\}$ 这一函数的"复杂性"的。对复杂性的刻画有很多，比如可以用这一函数的决策树的高度来刻画，也可以用多项式插值后的度数来刻画。其中有一种刻画称为"敏感度"，$s(f,x)$ 表示函数在输入 $x$ 时，有多少个数位 $i$ 满足 $x$ 的第 $i$ 位被取反以后函数值会发生改变。另一种更一般的刻画敏感度的方法是"块敏感度"，$bs(f,x)$ 表示最多能有数位的多少个不相交的集合（块）使得每个块中每一位都取反以后函数值会发生变化。可见敏感度是块敏感度的一种特殊情形，因此有 $s(f,x) \leq bs(f,x)$。1992 年"敏感度猜想"的提出，是想要证明存在一个常数 $c$ 使得 $s(f,x) \leq \left(bs(f,x)\right)^c$。如果能够证明这一点，那么就说明许多对布尔函数复杂度的刻画无非是多项式级别的差距，换言之基本是等价的。

这一猜想最终在 2019 年被中国数学家黄皓用半页纸给出了证明。这样的事在 21 世纪是罕见的，因为看上去如此简单的问题在经过 30 年间无数聪明数学家的思考以后没能解决，却最终被一个年轻人用很简单的方法解决了。

人们很早就提出了这一问题的组合等价形式（这里不证明），对于 $n$ 维超立方体 $H$（节点是 $\{0,1\}^n$，共 $2^n$ 个，两点之间有边当且仅当只有一位不同）形成的图，它的任何一个超过 $2^{n-1}$ 个节点的子图上的最大度数一定满足 $d_{max} \geq \sqrt{n}$。黄皓的证明如下：归纳地构造出超立方体图的邻接矩阵，关键地它把一些边的边权设成了负数：

$$
A_1=\begin{bmatrix}0&1\\1&0\end{bmatrix},
\quad
A_{n+1}=\begin{bmatrix}A_n&I\\I&-A_n\end{bmatrix}
$$

因为对于 $A_n$，它首先是一个 $2^n \times 2^n$ 的矩阵，对它的每一位取绝对值以后（去掉负权值），两个坐标 $(x_1,\cdots,x_n)$ 与 $(y_1,\cdots,y_n)$ 之间如果满足 $x_n=y_n$，那么根据行列的分布它们一定落在左上角或右下角的 $A_{n-1}$ 里，根据归纳法它们有边当且仅当 $(x_1,\cdots,x_{n-1})$ 与 $(y_1,\cdots,y_{n-1})$ 之间有一位不同；如果 $x_n \neq y_n$，那么它落在左下角或右上角的单位矩阵内，当且仅当 $(x_1,\cdots,x_{n-1})$ 与 $(y_1,\cdots,y_{n-1})$ 全部相同才会有边相连。综上我们证明了这个图就是带权的 $n$ 维超立方体的邻接矩阵。计算可得

$$
A_n^2=\begin{bmatrix}A_n&I\\I&-A_n\end{bmatrix}\begin{bmatrix}A_n&I\\I&-A_n\end{bmatrix}
=\begin{bmatrix}A_{n-1}^2+I&0\\0&A_{n-1}^2+I\end{bmatrix}
$$

由于

$$
A_1^2=\begin{bmatrix}0&1\\1&0\end{bmatrix}\begin{bmatrix}0&1\\1&0\end{bmatrix}
=\begin{bmatrix}1&0\\0&1\end{bmatrix}=I
$$

归纳可得 $A_n^2=nI$。因此 $A_n^2$ 的 $2^n$ 个特征值均为 $n$，由于平方后特征值都变成平方，推出 $A_n$ 的特征值全为 $\sqrt{n}$ 或 $-\sqrt{n}$。而根据 $A_n$ 的形式有容易发现它的迹（对角线元素之和）为 $0$，由于矩阵的迹等于特征值之和，因此这些特征值中一定是 $2^{n-1}$ 个 $\sqrt{n}$，$2^{n-1}$ 个 $-\sqrt{n}$。删掉若干点留下超过 $2^{n-1}$ 个点的子图 $H$，它的特征值 $\mu$ 根据 Cauchy 交错原理满足

$$
\mu_1 \geq \lambda_{1+2^n-|H|} \geq \lambda_{2^{n-1}}=\sqrt{n}
$$

而 $\mu_1 \leq d_{max}$。综上，$d_{max} \geq \sqrt{n}$。