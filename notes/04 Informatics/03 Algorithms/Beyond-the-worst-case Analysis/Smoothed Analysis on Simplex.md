我们采用这样的形式来讨论线性规划：$\max c^\top x$ subject to $Ax\leq b$，其中$x,c\in \R^n$，$A \in \R^{m\times n},b\in \R^m$。其中$P=\{x\mid Ax\leq b\}$称为可行域，是$\R^n$中的多面体。求解线性规划问题的最常用算法就是单纯形法，它指出我们从$P$的一个顶点$x_0$出发，每次沿着多面体$P$的棱转移到一个使得$c^\top x_0'>c^\top x_0$的顶点$x_0'$，直到当前顶点形成局部最优解（无法继续转移），此时得到的就是线性规划的最优解。由此可见，单纯形法的复杂度与$P$的顶点个数有关。尽管在二维时多边形的顶点数等于边数等于约束个数$m$，但在高维时就不是这样的了：$n$维空间中的单位立方体的顶点数达到$2^n$，是关于$n$的指数规模的。可以构造这样的线性规划的例子，使得单纯形法必须几乎访问$P$的全部顶点才能达到局部最优，因此单纯形法在worst case下是指数复杂度的。Spielman and Teng于2004年提出了关于特定的一种单纯形法的平滑分析，在对参数$A,b,c$的每一项都叠加上一个轻微扰动以后，期望意义下算法有多项式的复杂度。

## The Shadow Vertex Simplex Method

单纯形法的关键在于转移顶点的选取。当处于某个顶点时，如果存在多个更优的相邻节点，本质上选取任意一个更优的相邻节点都是可行的，但是不同的选取规则就会产生不同的单纯性算法。这一选取规则称为Pivot Rule。下面我们引入Shadow Vertex Rule，并基于这种单纯形法做平滑分析（这个pivot rule在实践中并不常用，但是它在分析上更方便）。

在线性规划问题$\max c^\top x$ subject to $Ax\leq b$中，给定参数$A,b$就确定了多面体$P$。此时对于任意给定的$c$，能使得$c^\top x$最大的那些可行的$x$就是$P$在$c$的方向上投影最大的$x$。我们定义$P[c]$来表示这些点，称为$P$在$c$下的一个最优面(Optimal Face)：$P[c]=\{x\mid x\in P,c^\top x=\sup\limits_{z\in P}c^\top z\}$。假如我们把参数$c$换做$d$，那么我们在$d$的方向上做投影同样能得到另一个集合$P[d]$。现在假如我们确定了$c,d$，我们来考虑当我们在$c,d$确定的平面内由$c$向$d$旋转方向向量时，最优面会发生什么样的变化。这等价于，对于$\forall \lambda\in [0,1]$，我们考察$P[\lambda c+(1-\lambda)d]$的变化。我们容易发现，如果$P[c]=P[d]$，那么这个集合是不会发生改变的，也即$\forall \lambda\in [0,1],P[c]=P[d]=P[\lambda c+(1-\lambda)d]$。如果$c\neq d$，那么我们会在旋转过程中得到一列随时间变化的最优面序列，称为$P$关于从$c$到$d$的一条Shadow Path。$P$的最优面总数是有限的，因此旋转过程中我们只会经过有限个不同的最优面。从几何上我们容易想象（以二维为例），造成最优面突变的$\lambda$对应的是$P$的顶点，而使得最优面相对静止的对应的是$P$的棱。因此我们找出那些使得最优面突变的$\lambda$，从小到大排列为$0=\lambda_0<\lambda_1<\cdots<\lambda_k<\lambda_{k+1}=1$，令$e_i=P[(1-\lambda_i)c+\lambda_i d]$，$v_i=P[(1-\lambda)c+\lambda d],\lambda \in (\lambda_i,\lambda_{i+1})$，那么Shadow Path就可以记为$P(c,d)=(v_0,e_1,v_1,\cdots,e_k,v_k)$。其中，$v_i=e_i\cap e_{i+1}$，$v_0=P[c][d],v_k=P[d][c],v_{i-1}=e_i[c]=e_i[-d],v_i=e_i[-c]=e_i[d]$ （这些性质在Lemma 14.3中陈述，严格来说是需要证明的，但从几何上其实是显然的：$v_i$是相邻两个最优面的交界点，起点是$c$的最优面上最大化$d$的部分，终点是$d$的最优面上最大化$c$的部分，$v_{i-1}$是$e_i$上最大化$c$的部分，同时也是$e_i$上最小化$d$的部分，$v_i$同理）。如果$e_i$恰好对应着$P$的棱（这意味着$v_i$一定恰好对应$P$的顶点），我们就称这一shadow path是nondegenerate的，我们下面只讨论nondegenerate的情况。注意到，此时shadow path对应着一条有效的simplex path！

如果我们把多面体$P$做这样的关于$c,d$的投影：$\forall x\in P,\pi_{c,d}=(c^\top x,d^\top x)$，此时我们得到了一个$P$在$\R^2$上的投影$\pi_{c,d}(P)$。此时我们可以证明(Lemma 14.5)，原先$P$上的shadow path和二维投影上的shadow path有这样的一一对应关系：记$e_c=(1,0),e_d=(0,1)$，则$[\pi_{c,d}(P)](e_c,e_d)=(\pi_{c,d}(v_0),\pi_{c,d}(e_1),\pi_{c,d}(v_1),\cdots,$ $\pi_{c,d}(e_k),\pi_{c,d}(v_k))$。也就是说，原先的shadow path在经过投影后恰好也是二维投影上关于两个坐标轴正方向的shadow path，而显然这个二维的shadow path就是$\pi_{c,d}(P)$在右上方的凸包。在这条shadow path上斜率是单调递增的，因此在$\pi_{c,d}(P)$上的pivot rule就是“沿着斜率最大方向转移”。这样我们就得到了在原先$P$上转移的pivot rule：对于$x_0\in P$，我们应当转移到使得$\dfrac{d^\top(x_1-x_0)}{c^\top (x_1-x_0)}$最大的$x_1$。我们发现，这其实又是一个关于$x_0$的可行方向的一个线性规划问题：设可行方向集合为$T_P(x_0)=\{w\in \R^n\mid \exists \varepsilon>0 \text{ s.t. }x+\varepsilon w\in P\}$，我们其实就是要最大化$d^\top w$ subject to $w\in T_P(x_0),c^\top w=1$。在具体问题中，这个线性规划有不同的形式，我们将在问题中具体讨论。至此，我们已经能完整描述了投影点单纯形法的执行过程：对于$\max d^\top x$ subject to $Ax\leq b$，我们选定一个$c$，从起点$x_0$出发，求解$d^\top w$ subject to $w\in T_P(x_0),c^\top w=1$，沿$w$方向前进直到无法前进，重复此过程直到可行方向集合为空。 可以证明，这个算法恰好会找出shadow path，因此是正确的simplex算法。

## The Successive Shortest Path Algorithm$\newcommand{\E}{\mathbb{E}}$ $\newcommand{\tight}{\text{tight}}$

下面我们用一个网络流的例子来对投影点单纯形法做平滑分析。

对于给定的一个网络，每条边除了有一个容量限制以外还有一个单位流量的费用。我们要找到一个这个网络上的最大流，这个最大流是所有最大流中费用最小的。其中一个流的费用定义为每条边上的流量乘以这条边的单位费用之和。

最小费用最大流问题可以表述为线性规划问题。对于有向图$G(V,E)$有源点和汇点$s,t\in V$。边的容量用向量表示为$u\in \R_+^E$。边的费用（方便起见我们假设费用只能取0或1）用向量表示为$c\in (0,1)^E$。流量$f\in \R_+^E$必须满足$\sum\limits_{ij\in E}f_{ij}=\sum\limits_{ji\in E}f_{ji},\forall i\in V\setminus \{s,t\}$（每个节点的流入等于流出），同时$0\leq f_{ij}\leq u_{ij},\forall ij \in E$（流量不能超过容量）。于是流的费用写作$c^\top f$。我们要在以上限制条件下找到所有使得$\sum\limits_{si\in E}f_{si}$（流量）取到最大值的$f$中使得$c^\top f$最小的那个。

把目标函数$\sum\limits_{si\in E}f_{si}$写作$d^\top f$（此时$d$在与源点相连的边上取1，其余取0）。设可行域为$P$，那么最大流的集合是最优面$P[d]$。我们想让$P[d]$中的流的费用尽量小，就是要最小化$c^\top f$，所以最小费用最大流的集合写作$P[d][-c]$。那么我们只需考虑shadow path $P(-c,d)$，根据Lemma 14.3，它的起点是$P[-c][d]$，终点是$P[d][-c]$。而$P[-c]$是在不考虑流量的情况下最小化费用，因此只有唯一的零流满足要求，也即$P[-c]=\{0\}$，因此$P[-c][d]=\{0\}$。因此我们直接从$0$出发，选定方向向量$-c,d$做投影执行shadow vertex simplex就能求出最小费用最大流了。

可以证明(Lemma 14.11)，在以上执行shadow vertex simplex的过程中，寻找最大的斜率恰好对应到网络流中是在残量网络中选取关于费用的最短路。这就是经典的连续最短路算法(The Successive Shortest Path Algorithm, SSP)，从0流量出发，每次选择费用的最短路做增广，就能求得最小费用最大流。进一步，在shadow path上，$e_i$在$c,d$平面上的斜率恰好等于$v_{i-1}$残量网络下$s$到$t$的费用最短路，同时等于在$v_i$残量网络下$t$到$s$的费用最短路的相反数。方便起见，用记号表示如下$p_{s,t}(v_{i-1})=s_{c,d}(e_i)=-p_{t,s}(v_i)$。

> SSP算法的正确性证明如下：我们证明每次增广以后我们得到的都是当前流量下的最小费用流。归纳法，流量为0时费用为0，已经是最小费用流了。假设当前流量为$w$，我们已经得到了当前流量下的最小费用流$f_w$。此时我们求出一条费用之和最小的增广路，做增广$w+\delta$，我们证明$f_{w+\delta}$一定是最小费用流。假如不是这样，那么设最小费用流为$f'_{w+\delta}$。考虑$f'_{w+\delta}-f_w$，它也是一条增广路，并且它的费用比我们求出的最短路还短，这意味着它经过了残量网络上一定关于费用的负环。也即我们的算法在得到$f_w$时，残量网络上还存在一条含负环的增广路，这与$f_w$是最小费用流矛盾，因为我们完全可以填满负环上的残量（不改变流量大小）使得总费用更小。

人们证明了SSP算法在worst-case下有指数的复杂度，现在我们对SSP做平滑分析，证明我们对边的费用做轻微扰动之后，SSP的复杂度在期望意义下是多项式级别的。我们给边的费用叠加一个满足正态分布$\mathcal{N}(0,\sigma^2)$的随机变量，这样扰动后每条边的费用在$[0,1]$后形成一个概率分布（要求扰动以后边的费用依然落在$[0,1]$内）。正态分布的一大好处在于其概率密度是有上界的，因此我们证明下面这个更广泛意义下的结论：设每条边的费用$c_e$是在$(0,1)$上以概率密度$f$取值的独立的随机变量，其概率密度函数$f$满足$\forall x\in (0,1),$ $0<f(x)\leq\phi$，其中$\phi$是参数且$\phi\geq 1$，那么SSP的迭代次数有上界$O(mn\phi)$（$n=|V|,m=|E|$）。

我们只需对于SSP对应的shadow path $P(-c,d)=(v_0,e_1,v_1,\cdots,e_k,v_k)$，记$P_E(-c,d)=(e_1,e_2,\cdots,e_k)$，$P_V(-c,d)=(v_0,v_1,\cdots,v_k)$，证明$\E[|P_E(-c,d)|]\leq O(mn\phi)$。

对于流$f$，我们用$\tight_P(f)$表示$E$中所有流量为0的边的集合（包括反向边在内，也即反向边的流量等于容量的边）。那么我们注意到对于shadow path $P(-c,d)=(v_0,e_1,\cdots,e_k,v_k)$，$\forall i\in [k]$满足：存在$a\in E$使得$a\in \tight_P(v_{i-1})$且$a\not\in \tight_P(e_i)$，也即每一次找到的新的增广路都一定包含一条流量为0的边（如果没有这样的边就说明上一次增广没有把流量加满，矛盾）。这样的边至少有$k$条，因此$k\leq \sum\limits_{a\in E}\mathbb{1}[\exists i\in [k] \text{ s.t. } a\in \tight_P(v_{i-1})\land a\not\in \tight_P(e_i)]$，右式可以进一步放大为$\sum\limits_{a\in E}\sum\limits_{i=1}^{k}\mathbb{1}[a\in \tight_P(v_{i-1})\land a\not\in \tight_P(e_i)]$，而$|P_E(-c,d)|=k$，于是我们得到不等式$|P_E(-c,d)|\leq$ $\sum\limits_{a\in E}\sum\limits_{i=1}^{k} \mathbb{1}[a\in \tight_P(v_{i-1})\land a\not\in \tight_P(e_i)]$。

$\forall \text{ fixed } a\in E$，如果$a\in \tight_P(v_{i-1})\land a\not\in \tight_P(e_i)$，根据Lemma 14.11有$p_{s,t}(v_{i-1})=s(e_i)$，其中$p_{s,t}(v_{i-1})$用到了$a$这条边，我们用上标$a+$来表示，于是$p_{s,t}^{a+}(v_{i-1})=s(e_i)$。同时，$-p_{t,s}(v_{i-1})=s(e_{i-1})$。在上凸包中斜率是单调递增的，因此$-p_{t,s}(v_{i-1})=s(e_{i-1})\leq s(e_i)=p_{s,t}^{a+}(v_{i-1})$。如果在最短路中禁用一条边，最短路一定会变大，我们用上标$a-$表示禁止流过边$a$（强制流量为0），那么不等式放缩为$-p_{t,s}^{a-}(v_{i-1})\leq p_{s,t}^{a+}(v_{i-1})\leq p_{s,t}^{a-}(v_{i-1})$。假如定义禁用$a$边的可行域$P_a=\{f\in P\mid a\in \tight_P(f)\}$，那么既然$v_{i-1}\in P(-c,d)$这一path中，一定也有$v_{i-1}\in P_a(-c,d)$（因为前$i$轮$a$的存在与否完全不会造成影响）。记$P_a(-c,d)=\{v_0^a,e_1^a,v_1^a,\cdots,e_{k_a}^{a},v_{k_a}^{a}\}$，那么推出$-p_{t,s}^{a-}(v_{i-1}^a)\leq p_{s,t}^{a+}(v_{i-1}^a)\leq p_{s,t}^{a-}(v_{i-1}^a)$。综上，$\sum\limits_{i=1}^{k} \mathbb{1}[a\in \tight_P(v_{i-1})\land a\not\in \tight_P(e_i)]\leq\sum\limits_{i=1}^{k_a}\mathbb{1}[-p_{t,s}^{a-}(v_{i-1}^a)\leq p_{s,t}^{a+}(v_{i-1}^a)\leq p_{s,t}^{a-}(v_{i-1}^a)]$。

抛开首尾两项，并调整下标，有$\sum\limits_{i=1}^{k_a}\mathbb{1}[-p_{t,s}^{a-}(v_{i-1}^a)\leq p_{s,t}^{a+}(v_{i-1}^a)\leq p_{s,t}^{a-}(v_{i-1}^a)]=2+\sum\limits_{i=1}^{k_a-1}\mathbb{1}[-p_{t,s}^{a-}(v_{i}^a)\leq p_{s,t}^{a+}(v_{i}^a)\leq p_{s,t}^{a-}(v_{i}^a)]$。边$a$的费用记为$c_a$，我们把上式对$c_a$取期望$\E_{c_a}\left[\sum\limits_{i=1}^{k_a-1}\mathbb{1}[-p_{t,s}^{a-}(v_{i}^a)\leq p_{s,t}^{a+}(v_{i}^a)\leq p_{s,t}^{a-}(v_{i}^a)]\right]=\sum\limits_{i=1}^{k_a-1}\Pr_{c_a}\left[-p_{t,s}^{a-}(v_{i}^a)\leq p_{s,t}^{a+}(v_{i}^a)\leq p_{s,t}^{a-}(v_{i}^a)\right]$。设$a=pq$，则$p_{s,t}^{a+}(v_i^a)=p_{s,p}(v_i^a)+p_{q,t}(v_i^a)+c_a$，那么$\Pr_{c_a}\left[-p_{t,s}^{a-}(v_{i}^a)\leq p_{s,t}^{a+}(v_{i}^a)\leq p_{s,t}^{a-}(v_{i}^a)\right]=\Pr_{c_a}[p_{s,p}(v_i^a)+p_{q,t}(v_i^a)+c_a\in [-p_{t,s}^{a-}(v_{i}^a),p_{s,t}^{a-}(v_{i}^a)]]$，显然$p_{s,p}(v_i^a)+p_{q,t}(v_i^a)$不包含任何与$c_a$有关的信息，因此可以看作常数移到右侧的区间内，得到$\Pr_{c_a}[c_a\in [-p_{t,s}^{a-}(v_{i}^a)-p_{s,p}(v_i^a)-p_{q,t}(v_i^a),p_{s,t}^{a-}(v_{i}^a)-p_{s,p}(v_i^a)-p_{q,t}(v_i^a)]]$

$=\displaystyle\int_{-p_{t,s}^{a-}(v_{i}^a)-p_{s,p}(v_i^a)-p_{q,t}(v_i^a)}^{p_{s,t}^{a-}(v_{i}^a)-p_{s,p}(v_i^a)-p_{q,t}(v_i^a)}f(x)\text{ d}x\leq \phi\cdot (p_{s,t}^{a-}(v_i^a)-(-p_{t,s}^{a-}(v_i^a)))$。

综上，$\E[|P_E(-c,d)|]\leq \sum\limits_{a\in E}\sum\limits_{i=1}^{k} \Pr[a\in \tight_P(v_{i-1})\land a\not\in \tight_P(e_i)]$ $\leq \sum\limits_{a\in E}\left(2+\phi\sum\limits_{i=1}^{k_a-1}(p_{s,t}^{a-}(v_i^a)-(-p_{t,s}^{a-}(v_i^a)))\right)$$\leq\sum\limits_{a\in E}\left(2+\phi(s_{c,d}(e_{k_a}^a)-s_{c,d}(e_1^a))\right)$，而斜率等于最短路，其绝对值一定小于$n$。因此$\leq m(2+\phi(2n))=O(mn\phi)$。

> 以上分析的直观是，我们发现如果SSP迭代了很多很多轮，那么每两轮之间最短路长度其实差别是非常小的。在大多数情况下，这是不会发生的。

## LPs with Gaussian Constraints

下面我们对一般线性规划的shadow vertex simplex做平滑分析。在$\max c^\top x$ subject to $\bar Ax\leq \bar b$（称为Base LP）中，我们对$\bar A,\bar b$中的每一项都叠加一个适当比例的正态分布扰动。为此，我们做normalization使得$\|(\bar a_i,\bar b_i)\|_2\leq 1$（其中记$\bar a_i$是$\bar A$的行向量，我们总可以通过不等式两边同时乘以常数来做到这点），然后对$\bar A,\bar b$每一项都叠加一个i.i.d.的$\mathcal{N}(0,\sigma^2)$的随机变量，得到一个新的线性规划$\max c^\top x$ subject to $Ax\leq b$，其中$A=\bar A+\hat A,b=\bar b+\hat b$（注意，我们对$c$不做扰动）。因为做了normalization，所以所有的扰动的方差都相等是合理的。我们把原先的LP称为Base LP，新的LP称为Smoothed LP。

我们用shadow vertex simplex来求解它。首先，我们要找到一个可行域中的起点。为此，我们构造这样一个interpolation(插值) LP：为$x$增添一个额外的维度$\lambda$，$(x,\lambda)\in \R^{n+1}$，$\max c^\top x+\gamma\lambda$ subject to $Ax+(1-b)\lambda\leq 1,0\leq \lambda \leq 1$（记为Int. LP）。可以发现，当$\lambda=1$时我们就回到了Smoothed LP了。设Int. LP的可行域为$P$，$e_\lambda$是$\R^{n+1}$中$\lambda$这一维度的坐标轴的正方向，那么$P[e_\lambda][c]$就是Smoothed LP的最优解。相反，$P[-e_\lambda][c]$是这样一个新的LP的最优解集合：$\max c^\top x$ subject to $Ax\leq 1$（记为Unit LP）。假如我们能求出Unit LP的最优解，那么我们相当于找到了Int. LP中simplex的一个起点，从它出发用shadow vertex求解$P[e_\lambda][c]$就可以求出Smoothed LP的最优解了。所以我们的算法分为两个阶段，第一阶段求出Unit LP的最优解，第二阶段以此为起点，用shadow vertex simplex求Int. LP的最优解$P[e_\lambda][c]$。

先来分析第二阶段的复杂度。为此需要以下关于shadow plane的lemma。令$W=\text{span}(c,d)$，称为一个shadow plane，直接求$P$在向量空间$W$上的正交投影$\pi_{W}(P)$。可以证明(Lemma 14.9)$P$在shadow vertex simplex中迭代次数有上界$|\text{vertices}(\pi_{W}(P))|$。如果$P$能够被表示为$\{x\in \R^n\mid Mx\leq 1\}$的形式，那么进一步有(Lemma 14.10)：$|\text{vertices}(\pi_{W}(P))|\leq |\text{edges}(P^\circ\cap W)|$，其中$P^\circ=\text{conv}(m_1,m_2,\cdots,m_k)$（设$m_i$是$M$的行向量，$\text{conv}$记号是对这些点求凸包）。现在，记$P'=\{(x,\lambda)\mid Ax+(1-b)\lambda \leq 1\}$，$H=\{(x,\lambda)\mid 0\leq \lambda \leq 1\}$，$W=\text{span}(c,e_\lambda)$，这样$P'\cap H$就是Int. LP的可行域，$W$就是一个shadow plane。由于$W$穿过$\lambda$的坐标轴，因此投影后这一维坐标不变，因此$\pi_W(P'\cap H)=\pi_W(P')\cap H$。与$H$取交相当于添加两个约束，最多增加四个vertices。并且$P'$的确满足Lemma 14.10需要的形式，因此$|\text{vertices}(\pi_{W}(P'\cap H))|\leq |\text{vertices}(\pi_{W}(P'))|+4$ $\leq |\text{edges}(P')^{\circ}\cap W)|+4$。对于不等式右侧的形式，有以下重要的结论(Theorem 14.13)：如果$a_1,\cdots,a_m$是独立的随机向量，每个向量的期望$\ell_2$ norm都$\leq 1$，同时每一项的方差都是$\sigma^2$，$W$是一个固定的二维子空间，那么$\E[|\text{edges}(\text{conv}(a_1,\cdots,a_m)\cap W)|]$ $=O(n^2\sqrt{\ln m}\sigma^{-2}+n^{2.5}\ln m\sigma^{-1}+n^{2.5}\ln^{1.5} m)$。我们注意到，$P'$的行向量满足方差固定，同时根据三角不等式其期望行向量模长$\leq 2$，做适当normalization就可以使他满足Thm 14.13的条件。这样我们就证明了二阶段的复杂度在期望意义下是多项式的。

再来分析第一阶段的复杂度。我们用以下Dimension-by Dimension (DD) Algorithm来求解Unit LP。令$k$从1依次取到$n$，每次求解$\max (c^k)^\top x$ subject to $Ax\leq 1,x_i=0(i>k)$（记为Unit LP$_k$），其中$c^k=(c_1,\cdots,c_k,0,\cdots,0)$。$k=1$的时候是单变量的，取区间端点就可以求出解；假设已经求出了Unit LP$_k$的最优解$v^*$，令$W_k=\text{span}(c^k,e_{k+1})$，任取一个$d\in W_k$，并注意到也有$c^{k+1}\in W_k$。显然$v^*$是Unit LP$_{k+1}$的一个合法初始点，那么从它出发以$d,c^{k+1}$作为方向向量运行shadow vertex simplex就可以求出Unit LP$_{k+1}$的最优解了。记Unit LP$_{k}$的可行域在$W_k$上的shadow为$S_k$，则整个算法的复杂度为$\sum\limits_{k=2}^{n}|\text{vertices}(S_k)|$，而显然每个Unit LP$_k$的矩阵行向量都满足期望模长小于1，每一项的方差为$\sigma^2$，那么再次运动Theorem 14.13得到$\E[|\text{vertices}(S_k)|]\leq O(n^2\sqrt{\ln m}\sigma^{-2}+n^{2.5}\ln m\sigma^{-1}+n^{2.5}\ln^{1.5} m)$。综上，$\E[\sum\limits_{k=2}^{n}|\text{vertices}(S_k)|]\leq n\cdot O(n^2\sqrt{\ln m}\sigma^{-2}+n^{2.5}\ln m\sigma^{-1}+n^{2.5}\ln^{1.5} m)$，是多项式的。（Spielman and Teng最早的结果不是用以上方法证明的，当时他们得到的bound是$O(n^{55}m^{86}\sigma^{-30}+n^{70}m^{86})$。）

综上，我们证明了Smoothed LP用shadow vertex simplex求解在期望意义下是多项式的。任何线性规划问题在参数叠加了正态分布的扰动以后，都存在一种期望意义下多项式复杂度的单纯形算法。











