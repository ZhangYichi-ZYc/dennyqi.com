## 对称矩阵的谱分解

我们知道实对称矩阵是可对角化的，有
$$
S=Q \Lambda Q^\top
$$
其中$Q$是标准正交矩阵，$\Lambda$是由特征值构成的对角矩阵。设$Q=\begin{bmatrix}v_1 & \cdots & v_n\end{bmatrix}$，就有$S=\left[\begin{array}{lll}
\boldsymbol{v}_{1} & \ldots & \boldsymbol{v}_{n}
\end{array}\right]\left[\begin{array}{cccc}
\lambda_{1} & 0 & \cdots & 0 \\
0 & \lambda_{2} & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & \lambda_{n}
\end{array}\right]\left[\begin{array}{c}
\boldsymbol{v}_{1}^{\top} \\
\vdots \\
\boldsymbol{v}_{n}^{\top}
\end{array}\right]$，把每个$v$看作整体运用分块矩阵的乘法，就得到
$$
S=\lambda_{1} \boldsymbol{v}_{1} \boldsymbol{v}_{1}^{\top}+\lambda_{2} \boldsymbol{v}_{2} \boldsymbol{v}_{2}^{\top}+\cdots+\lambda_{n} \boldsymbol{v}_{n} \boldsymbol{v}_{n}^{\top}
$$
这就是对称矩阵的谱分解，本质上就是对角化的另外一种表示方式。

而由于$Q$是可逆的，$\text{rank}(\Lambda)=\text{rank}(S)$。而$\text{rank}(\Lambda)$就是非零特征值的个数。在谱分解的表达式中，我们可以直接抹掉特征值为0的项，如果$\text{rank}(S)$很小，那么谱分解表达式的复杂度就很小。更精确地，用矩阵表示$S$需要$n^2$个数字，而用谱分解来表示$S$只需要$(n+1) \cdot \text{rank}(S)$个数字。在$\text{rank}(S)$远小于$n$的时候复杂度减小了一个数量级。这使得谱分解在图像压缩等领域有广泛的应用

## 一般矩阵的奇异值分解(SVD)

对于非对称的矩阵，也有一种类似地分解方式。此时的“对角化”不用特征值而变成了“奇异值”。对于矩阵$A_{m \times n}$，假如$\text{rank}(A)=r$，那么我们我们可以找到标准正交的矩阵$U_{m \times m},V^\top _{n \times n}$，以及矩阵$\Sigma_{n \times n}=\begin{bmatrix}D_{r \times r} & 0 \\ 0 & 0\end{bmatrix}$（其中$D=\left[\begin{array}{cccc}
\sigma_{1} & 0 & \cdots & 0 \\
0 & \sigma_{2} & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & \sigma_{r}
\end{array}\right]$，$\sigma_i$就是奇异值），使得能够成立
$$
A=U\Sigma V^\top
$$
用类似的方法展开有
$$
A=\sigma_{1} \boldsymbol{u}_{1} \boldsymbol{v}_{1}^{\top}+\sigma_{2} \boldsymbol{u}_{2} \boldsymbol{v}_{2}^{\top}+\cdots+\sigma_{r} \boldsymbol{u}_{r} \boldsymbol{v}_{r}^{\top}
$$
可以发现，复杂度从$nm$降为了$(n+m+1) \cdot \text{rank}(A)$

事实上我们注意到，奇异值分解是谱分解（即一般的对角化）的一种推广。因此奇异值与特征值有很密切的关系。当$A$退化为对称方阵的时候，奇异值就是特征值。

我们可以证明，$A$的奇异值恰好是矩阵$A^\top A$的特征值的算术平方根！

$A^\top A$是个对称矩阵。我们知道，一个矩阵是否是正定的，即它的特征值是否恒为正，与这个矩阵的二次型是否恒为正是充分必要的。我们很容易验证$A^\top A$的二次型始终是正的，因为$x^\top A^\top Ax=(Ax)^\top (Ax)=(Ax)^2 \geq 0$。唯一需要注意的是，由于$A$不一定列满秩，等于0的等号是可能取到的。因此我们或许不能说$A^\top A$是正定的，只能说它是“半正定”的。用完全类似的方法，我们可以验证$A^\top A$的所有特征值都是非负的。$A^\top A$的非零特征值就是它的全部正特征值，而由于非零特征值个数就等于矩阵的秩，因此$A^\top A$恰好有$\text{rank}(A^\top A)$个正的特征值。

我们在讨论投影矩阵的时候证明过$\text{rank}(A)=\text{rank}(A^\top A)$。由于$\text{rank}(A)=\text{rank}(A^\top A)$，那么如果做代换$A \to A^\top$，就会得到$\text{rank}(A^\top) = \text{rank}((A^\top) ^\top A^\top)$。而由于行秩等于列秩，这告诉我们$\text{rank}(A)=\text{rank}(AA^\top)$。所以，$\text{rank}(A)=\text{rank}(A^\top A)=\text{rank}(AA^\top)$。

现在我们知道，$A^\top A$恰好有$\text{rank}(A)$个正的特征值。我们很容易验证，$AA^\top$也是“半正定阵”，它也恰好有$\text{rank}(A)$个正的特征值。

我们设$A^\top A$有$r$个特征值$\lambda_1,\cdots \lambda_r$，并且实对称矩阵的代数重数等于几何重数，对应地我们可以找到$r$个线性独立的特征向量。更进一步，这$r$个向量可以是两两正交的单位向量（因为不同特征值对应的特征向量一定是正交的，而同一个特征值的特征子空间里一定能够选出正交基），设为$v_1,\cdots,v_r$。

我们可以验证：$\dfrac{1}{\sqrt{\lambda_{1}}} A \boldsymbol{v}_{1}, \ldots, \dfrac{1}{\sqrt{\lambda_{r}}} A \boldsymbol{v}_{r}$是互相标准正交的：首先，$\left(\dfrac{1}{\sqrt{\lambda_{i}}} A \boldsymbol{v}_{i}\right)^2=\dfrac{v_i^\top A^\top A v_i}{\lambda_i}$，由于$A^\top Av_i=\lambda_iv_i$，因此$\dfrac{v_i^\top (A^\top A v_i)}{\lambda_i}=\dfrac{v_i^\top \lambda_i v_i}{\lambda_i}$$=(v_i)^2=1$。同时，$\left(\dfrac{1}{\sqrt{\lambda_{i}}} A \boldsymbol{v}_{i}\right)\left(\dfrac{1}{\sqrt{\lambda_{j}}} A \boldsymbol{v}_{j}\right)=\dfrac{v_i^\top A^\top A v_j}{\sqrt{\lambda_i\lambda_j}}=\dfrac{v_i^\top \lambda_j v_j}{\sqrt{\lambda_i\lambda_j}}=0$。此时我们发现，$\dfrac{1}{\sqrt{\lambda_{i}}} A \boldsymbol{v}_{i}=\dfrac{1}{\sqrt{\lambda_i}}A\left(\dfrac{A^\top Av_i}{\lambda_i}\right)=AA^\top\left(\dfrac{1}{\lambda_{i}\sqrt{\lambda_{i}}} A \boldsymbol{v}_{i}\right)$，整理得到
$$
AA^\top \left(\dfrac{1}{\sqrt{\lambda_{i}}} A \boldsymbol{v}_{i}\right)=\lambda_i \left(\dfrac{1}{\sqrt{\lambda_{i}}} A \boldsymbol{v}_{i}\right)
$$
这意味着，$\dfrac{1}{\sqrt{\lambda_{i}}} A \boldsymbol{v}_{i}$恰好是矩阵$AA^\top$（注意不是$A^\top A$）的特征向量，而每个$A^\top A$的特征值$\lambda_i$恰好也是$AA^\top$的特征值！直觉上我们已经感受到，$A^\top A$和$AA^\top$有完全相同的特征值，但我们还需要小心的验证这个断言。我们已经知道这两个矩阵拥有“相同种类”的特征值，但还不知道每个数值的特征值个数是否相同。其实这也是容易验证的，因为我们已经知道$v_i$是线性独立的，$\dfrac{1}{\sqrt{\lambda_{i}}} A \boldsymbol{v}_{i}$也是线性独立的。每个$v_i$占了一维来对应$\lambda_i$，而每个$\dfrac{1}{\sqrt{\lambda_{i}}} A \boldsymbol{v}_{i}$也占了一维来对应$\lambda_i$。因此每个$\lambda_i$在$A^\top A$和$AA^\top$中的维数（即代数重数和几何重数，它们是相等的）是相等的。综上，$A^\top A$和$AA^\top$有完全相同的特征值。

$v_1,\cdots,v_r$可以扩展为$\R^n$的一组基$v_1,\cdots,v_n$，同时依然保证它们是标准正交的特征向量，对于每个$i$都有$A^\top A v_i=\lambda_iv_i$。同时，我们令$u_i=\dfrac{1}{\sqrt{\lambda_{i}}} A \boldsymbol{v}_{i}$，同时把$u_1,\cdots,u_r$也扩展为$\R^m$的一组基$u_1,\cdots,u_m$，同时保证它们是两两正交的单位向量。于是我们令$V = \begin{bmatrix}v_1 & \cdots & v_n\end{bmatrix},U=\begin{bmatrix}u_1 & \cdots & u_m\end{bmatrix}$，令$\sigma_i=\sqrt{\lambda_i}$，就有：
$$
AV=\left[\begin{array}{llllll}
\boldsymbol{u}_{1} & \ldots & \boldsymbol{u}_{r} & \boldsymbol{u}_{r+1} & \ldots & \boldsymbol{u}_{m}
\end{array}\right]\left[\begin{array}{cccccc}
\sqrt{\lambda_{1}} & & & & & \\
& \ddots & & & & \\
& & \sqrt{\lambda_{r}} & & & \\
& & & 0 & & \\
& & & & \ddots & \\
& & & & & 0
\end{array}\right]
$$
这是容易验证的，因为只需验证$Av_i=\sqrt{\lambda_i}u_i$。对于$i \leq r$，$\sqrt{\lambda_i}u_i=Av_i$，对于$i>r$，$Av_i=\lambda_i v_i=0$。这样我们就证明了$(1)$式！

## SVD中的矩阵与基

由于$A=\sigma_{1} \boldsymbol{u}_{1} \boldsymbol{v}_{1}^{\top}+\sigma_{2} \boldsymbol{u}_{2} \boldsymbol{v}_{2}^{\top}+\cdots+\sigma_{r} \boldsymbol{u}_{r} \boldsymbol{v}_{r}^{\top}$，我们容易发现$A$的每个列向量都是$u_1,\cdots,u_r$的线性组合，因此有$C(A) \subseteq \text{span}\{u_1,\cdots,u_r\}$，而因为$\dim(C(A))=r$，因此就有$C(A)=\text{span}\{u_1,\cdots,u_r\}$。因此$\{u_1,\cdots,u_r\}$就是$C(A)$的一组基！

对于$v_{r+1 ..n}$，任意一个乘在奇异值分解式上就会得到$Av_i=\sigma_{1} \boldsymbol{u}_{1} \boldsymbol{v}_{1}^{\top}v_i+\sigma_{2} \boldsymbol{u}_{2} \boldsymbol{v}_{2}^{\top}v_i+\cdots+\sigma_{r} \boldsymbol{u}_{r} \boldsymbol{v}_{r}^{\top}v_i$，而$v_j ^\top v_i=0$对于$j \in [r]$是恒成立的，因此$Av_i=0$对于$i > r$是恒成立的，因此$v_i \in N(A)$。而$\dim(N(A))=n-r$，因此$\{v_{r+1} ,\cdots,v_n\}$就是$N(A)$的一组基！

如果对$A=U\Sigma V^\top$取转置，那么$A^\top = V \Sigma U^\top$，套用相同的结论就会得到$\{v_1,\cdots,v_r\}$是$C(A^\top)$的一组基，$\{u_{r+1} ,\cdots,u_m\}$是$N(A^\top )$的一组基。

由此可见，我们在SVD过程中就已经得到了$C(A),N(A),C(A^\top),N(A^\top)$的标准正交基。

## 拟合

### 直线拟合

给出$\R^n$中的$m$个点$a_1,\cdots,a_m$（点和向量是等价的），要想找到一条直线（用单位向量$w$表示），使得所有点到直线的距离平方和最小，这就是直线的拟合问题。

考虑$a_i$在$w$上的投影$p_i$，那么我们要最小化$\sum\limits_{i \in [n]}d_i^2=\sum\limits_{i \in [n]}a_i^2-\sum\limits_{i \in [n]}p_i^2$就等价于最大化$\sum\limits_{i \in [n]}p_i^2$。而$p_i^2=(w \cdot a_i)^2$。如果我们构造矩阵$A=\begin{bmatrix}a_1^\top \\ \vdots \\ a_m^\top \end{bmatrix}$，那么我们只需最大化$(Aw)^2$，即最大化$\|Aw\|$。

神奇的是，$\|Aw\|$的最大值恰好是$A$的最大的奇异值$\sigma_1$。我们知道$\sigma_1=\sqrt{\lambda_1}$，如果我们把$v_1$乘在奇异值分解的表达式上就会得到$Av_1=\sigma_{1} \boldsymbol{u}_{1} \boldsymbol{v}_{1}^{\top}v_1+\sigma_{2} \boldsymbol{u}_{2} \boldsymbol{v}_{2}^{\top}v_1+\cdots+\sigma_{r} \boldsymbol{u}_{r} \boldsymbol{v}_{r}^{\top}v_1=\sigma_{1} \boldsymbol{u}_{1}$，因此$(Av_1)^2=\sigma_1^2u_1^2=\sigma_1^2$，即取$w=v_1$时刚好取到最大值。那么下面我们只需证明对于任意的$w$都有$(Aw)^2 \leq \sigma_1^2$

我们考虑这样一个事实：假如$q_i$是一组标准正交基，那么对于任意的向量$v$我们可以写出$v=c_1q_1+\cdots+c_nq_n$，把它乘开一定得到$v^2=\sum\limits_{i \in [n]}c_i^2$，即标准正交基下向量的长度和其坐标向量的长度是相等的。

我们取出奇异值分解式中的$v_1, \cdots,v_n$，那么有$w=c_1v_1+\cdots+c_nv_n$。由于$v_i$是标准正交基，因此$\sum\limits_{i \in [n]}c_i^2=\|w\|^2=1$。我们把$w$乘在奇异值分解式上，得到$A \boldsymbol{w}  =\left(\sigma_{1} \boldsymbol{u}_{1} \boldsymbol{v}_{1}^{\top}+\sigma_{2} \boldsymbol{u}_{2} \boldsymbol{v}_{2}^{\top}+\cdots+\sigma_{r} \boldsymbol{u}_{r} \boldsymbol{v}_{r}^{\top}\right)\left(c_{1} \boldsymbol{v}_{1}+\cdots+c_{n} \boldsymbol{v}_{n}\right)$$=\sum\limits_{i \in[r], j \in[n]} \sigma_{i} c_{j} \boldsymbol{u}_{i} \boldsymbol{v}_{i}^{\top} \boldsymbol{v}_{j}=\sum\limits_{i \in[r]} \sigma_{i} c_{i} \boldsymbol{u}_{i}
$，因此得到$Aw$在$u_1,\cdots,u_m$这组基下的坐标为$(\sigma_1c_1,\cdots,\sigma_rc_r,0,\cdots,0)$。因为$u_i$是标准正交基，因此$\|Aw\|^2=\sum\limits_{i \in [r]}\sigma_i^2c_i^2$。可以这样放缩：$\|Aw\|^2=\sum\limits_{i \in [r]}\sigma_i^2c_i^2 \leq \sum\limits_{i \in [r]}\sigma_1^2c_i^2=\sigma_1^2\sum\limits_{i \in [r]}c_i^2=\sigma_1^2$，证毕。

### 子空间拟合

同直线拟合类似，现在我们要找到一个子空间，使得给出$\R^n$中的$m$个点$a_1,\cdots,a_m$到子空间$W$的距离平方和最小。为了找到这样的子空间，只需要找到$W$的一组基$w_1,\cdots,w_k$。而$a_i$到$W$的距离平方就是$a_i^2$减去其在$W$上的投影向量的平方（我们曾经在正交性中证明过这一点），因此要最小化这个距离平方和，就是最大化$\sum\limits_{i \in [m]}p_i^2$。

我们也曾经证明过，如果我们选取$W$的标准正交基，就一定满足$p_i=\sum\limits_{j \in [k]}w_j w_j^\top a_i$，即一个向量在某个子空间上的投影恰好等于其在标准正交基的每个向量上的投影之和，“正交”是具有这种“独立性”的。于是，$p_i=\sum\limits_{j \in [k]}(w_j^\top a_i)w_j$，这可以理解为$p_i$在$\{w_{1..k}\}$这组基下的坐标是$(w_1^\top a_i,\cdots,w_k^\top a_i)$。再次根据标准正交基下向量的长度和其坐标向量的长度相等，得到$p_i^2=\sum\limits_{j \in [k]}(w_j^\top a_i)^2$。

所以我们要最大化$\sum\limits_{i \in [m]}\sum\limits_{j \in [k]}(w_j^\top a_i)^2$。交换下标，得到$\sum\limits_{j \in [k]}\sum\limits_{i \in [m]}(w_j^\top a_i)^2$。再次构造矩阵$A=\begin{bmatrix}a_1^\top \\ \vdots \\ a_m^\top \end{bmatrix}$，那么$\sum\limits_{i \in [m]}(w_j^\top a_i)^2=\sum\limits_{i \in [m]}(a_i^\top w_j)^2=(Aw_j)^2$。问题转化为最大化$\sum\limits_{j \in [k]}(Aw_j)^2$。

这个问题其实与“直线拟合”的问题是类似的，直线拟合中我们只要选出一个$w$来使得$(Aw)^2$最大，现在我们本质上就是要选出$k$个两两正交的单位向量，使得所有的$(Aw_i)^2$之和最大。我们发现，我们是可以“贪心”地来选$w_i$，因为我们将会看到这种最大化是“无后效性”的。我们从$w_1$依次选到$w_k$，当我们选$w_1$时，我们证明过$(Aw_1)^2$最大不可能超过奇异值中最大的那个的平方，并且最大值恰好在$w_1=v_1$时取到，我们就这么选；而当我们选$w_2$时，对可选的向量有了要求，我们不能再次选$v_1$或与$v_1$共线的向量了，因此“很有可能”不能再次取到最大值$\sigma_1^2$了，我们只能选取和$v_1$正交的向量，即$w_2$必须落在$\text{span}\{v_1\}$的正交补空间里。

我们可以归纳地看这个问题，$w_k$只能在$\text{span}\{v_1,\cdots,v_{k-1}\}$的正交补空间里选，而这个正交补空间地一组基就是$\{v_k,\cdots,v_n\}$。那么$w_k$一定能写成线性组合$w_k=c_kv_{k}+\cdots+c_nv_n$。那么根据SVD的表达式（假设$\sigma_i$已经从大到小排序）

$\begin{aligned}(A \boldsymbol{w}_k)^2 & =[\left(\sigma_{1} \boldsymbol{u}_{1} \boldsymbol{v}_{1}^{\top}+\sigma_{2} \boldsymbol{u}_{2} \boldsymbol{v}_{2}^{\top}+\cdots+\sigma_{r} \boldsymbol{u}_{r} \boldsymbol{v}_{r}^{\top}\right)\left(c_kv_{k}+\cdots+c_nv_n\right)]^2\\&=[c_k\sigma_ku_k+\cdots+c_r\sigma_ru_r]^2 \\ & \leq \sigma_k^2[c_ku_k+\cdots+c_ru_r]^2 \\&=\sigma_k^2 \sum\limits_{i=k}^{r}c_i^2\\& \leq\sigma_k^2\end{aligned}$

这意味着，每一次选取我们的结果都不能超过$\sigma_k^2$。因此选取$k$次，结果一定不能超过$\sum\limits_{j \in [k]}\sigma_i^2$。而恰好，当$w_i=v_i$时全都取到等号。

> 如果$k>r$，则肯定至少能选到一个子空间包含所有的$a_i$，因此距离为0

## 伪逆矩阵

我们只对方阵定义过逆矩阵，并且这个方阵还必须是满秩的。 而对于一般的长方形的不满秩的矩阵，我们可以利用奇异值分解定义“伪逆矩阵”。

根据SVD有$A=U\Sigma V^\top$，那么定义$A^+=V\Sigma^+ U^\top$为$A$的伪逆矩阵，其中$\Sigma^+$中的奇异值为$\Sigma$中的倒数。我们容易验证，$A$乘以$A^+$就会得到一个类似于单位矩阵的矩阵，它只有左上角的$\text{rank}(A)$个数为1，其余为0。

### 伪逆矩阵最小二乘法

在最小二乘法中，如果$A$是列满秩的，那么有最小二乘解$\hat{x}=(A^\top A)^{-1}A^\top b$。而如果$A$不是列满秩的，那么$A^\top A$不可逆，我们不能直接用$A$，而是必须在$C(A)$中找到新的基$A'$，得到新的关于列满秩的$A'$得到最小二乘解$\hat{x'}=(A'^\top A')^{-1}A'^\top b$。

利用伪逆矩阵，我们可以直接给出最小二乘解$x^+ = A^+ b$。我们知道$\|b-Ax\|$取最小值当且仅当$Ax=p$，其中$p$是$b$在$C(A)$上的投影。最小二乘法就是找这个投影。所以，其实我们只需验证$Ax^+=p$。

由奇异值分解及伪逆矩阵的定义可得

$AA^+b=U\Sigma V^\top V \Sigma^+ U^\top b=U \Sigma \Sigma^{+} U^\top b$

$=\begin{bmatrix}
u_1 & \cdots & u_m
\end{bmatrix}\left[\begin{array}{cccccc}
\sigma_{1} & \cdots & 0 & 0 & \cdots & 0 \\
\vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\
0 & \cdots & \sigma_{r} & 0 & \cdots & 0 \\
0 & \cdots & 0 & 0 & \cdots & 0 \\
\vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\
0 & \cdots & 0 & 0 & \cdots & 0
\end{array}\right]\left[\begin{array}{cccccc}
\sigma_{1}^{-1} & \cdots & 0 & 0 & \cdots & 0 \\
\vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\
0 & \cdots & \sigma_{r}^{-1} & 0 & \cdots & 0 \\
0 & \cdots & 0 & 0 & \cdots & 0 \\
\vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\
0 & \cdots & 0 & 0 & \cdots & 0
\end{array}\right]\begin{bmatrix}
u_1^\top\\ \vdots \\ u_m^\top
\end{bmatrix}b$

$=\begin{bmatrix}
u_1 & \cdots & u_m
\end{bmatrix}\left[\begin{array}{cccccc}
1 & \cdots & 0 & 0 & \cdots & 0 \\
\vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\
0 & \cdots & 1 & 0 & \cdots & 0 \\
0 & \cdots & 0 & 0 & \cdots & 0 \\
\vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\
0 & \cdots & 0 & 0 & \cdots & 0
\end{array}\right]\begin{bmatrix}
u_1^\top\\ \vdots \\ u_m^\top
\end{bmatrix}b$

$=\begin{bmatrix}
u_1 & \cdots & u_r & 0 & \cdots & 0
\end{bmatrix}\begin{bmatrix}
u_1^\top\\ \vdots \\ u_m^\top
\end{bmatrix}b=\sum\limits_{i \in [r]}u_iu_i^\top b$

设$Q=\begin{bmatrix}
u_1 & \cdots & u_r
\end{bmatrix}$，则得到$AA^+b=QQ^\top b$。而我们证明过$\{u_{1..r}\}$是$C(A)$的一组基，因此$QQ^\top b$就是$b$在$C(A)$上的投影，因此$AA^+ b=p$。

### 伪逆矩阵唯一性

由于$U,V$的选取不唯一，我们要问$A^+$是否唯一？

对于一个一般的矩阵$A$，$Ax=b$的最小二乘解$x$是不唯一的，因为$A$不一定满秩，线性组合出投影有不止一种方法。根据$x^+ = A^+b$，$x^+=\sigma_1^{-1}v_1u_1^\top b+\cdots+\sigma_r^{-1}v_ru_r^\top b$，因此$x^+$是$v_1 \cdots v_r$的线性组合，即$x^+ \in C(A^\top)$。而$Ax=Ax^+$，因此有$x-x^+ \in N(A)$。而$C(A^\top)$与$N(A)$为正交补空间，因此有$x^+ \bot (x-x^+)$。于是$x^2 = (x-x^++x^+)^2 = (x-x^+)^2+(x^+)^2$。那么对于所有$x \neq x^+$，一定有$\|x^+\| < \|x\|$。也就是说，伪逆矩阵求出的$x^+$是所有最小二乘解里长度最短那一个，这也意味着这样最短的向量只有它一个，因为所有与它不相等的最小二乘解都比它更长。$x^+$一定是唯一的。

假设有两个不同的伪逆矩阵$A^+_1,A^+_2$，那么由于$x^+$的唯一性要求$A^+_1 b = A^+_2b$，而这对于所有$b$都成立，因此有$A_1^+ = A_2^+$。所以伪逆矩阵是唯一的。







