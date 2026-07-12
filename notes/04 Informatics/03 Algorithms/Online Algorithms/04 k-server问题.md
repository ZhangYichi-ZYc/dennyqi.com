## $k$-server问题$\newcommand{\ALG}{\text{ALG}}\newcommand{\OPT}{\text{OPT}}$

对于一个集合$S$，如果可以对于其中任意两个元素$x,y$定义距离$d(x,y)$，并且满足正定性：$\forall x,y,d(x,y)\geq 0$且$d(x,y)=0$当且仅当$x=y$；对称性：$\forall x,y,d(x,y)=d(y,x)$；三角不等式$\forall x,y,z,d(x,y)+d(y,z)\geq d(x,z)$，就称$(S,d)$为一个度量空间(metric space)。

在一个度量空间$(S,d)$中，有$k$个可移动的server，它们初始时位于位置$p_1,\cdots,p_k$，其中$p_i\in S$。现在有一连串的请求$x_1,\cdots,x_n$，其中$x_i\in S$。当遇到请求$x_i$时，需要有一个server移动到位置$x_i$，代价就是该server移动前的位置到$x_i$的度量，然后才能处理下一个请求。应当怎样设计server的移动策略，才能使得总代价尽量小？这就是$k$-server问题。

一个很重要的观察是，Cache问题可以归约到$k$-server问题。对于一个大小为$k$的cache，假设不同的页个数最多为$m$，那么我们可以构造一个$m$个点的完全图（无向图），边权为1，那么每个点到自己的距离为0，到其他任意点的距离都为1，这就构成了一个度量空间。对于这个度量空间上的$k$-server问题，如果server不需要移动就对应cache hit，需要移动就对应cache miss，消耗代价为1，因此$k$-server的代价都可以看作cache miss的总数。

既然我们已经知道Cache问题的确定性算法的ratio只能做到$k$，因此$k$-server的确定性算法的ratio不可能比$k$更小。同理，由于Cache问题的随机算法的ratio最优为$O(\log k)$，因此$k$-server的随机算法的ratio也不可能比$O(\log k)$最好。那么，能否证明$k$-server的ratio恰好是$k$（对于随机算法，$O(\log k)$）呢？

## Fixed Ranged & Greedy

为了讨论方便，我们简化一下问题的模型。考虑“一维数轴上的整点”作为度量空间，并且只有两个server的情况。初始时所有server都位于原点。

我们容易想到一个Fixed Ranged的算法：一个server负责所有$[0,+\infty)$的请求，一个server负责所有$(-\infty,0)$的请求。然而我们可以构造一个请求的序列：$3,4,3,4,\cdots$，我们的算法不停用右侧server去服务，因此总代价是$O(n)$的。但是OPT只需把两个server分别移到$3$和$4$，那么总代价是常数的。因此在这样的例子下ratio达到了$O(n)$，不满足我们的期待。

另一个容易想到的算法是贪心：每次让靠得更近的server去服务。但是这样依然是不优的，假设初始是两个server的位置在$-100,100$，那么考虑请求序列$101,102,101,102,\cdots$，我们的算法依然是在不停移动右侧的server，而OPT会把两个server分别放置在$101$和$102$上，依然达到了$O(n)$的ratio。

## Double Coverage

从以上例子中可以看出，我们构造的算法之所以不好，是因为OPT总是能移动两个server，而我们的算法在特定的构造下只会去移动其中一个server。所以我们提出这样一个算法：当一个请求位于两个server的区间外部时，依然只移动较近的那个server；当请求位于内部时，让两个server同时以相同的速度靠近，直到其中一个先碰到请求位置。这称为Double Coverage算法。

注意，在我们对问题的描述中，虽然只允许每次移动一个server，但是上述描述中我们似乎在同时移动两个server。然而我们可以通过一个“lazy”的转换把以上算法变成每次只移动一个server的版本：当请求位于内部时，移动离请求近的server，同时把本来另一个server应当移动的距离记录下来，并假想它已经到达做了移动，直到下一次需要移动它时，再一次性让它经历所有它本该做的移动。

这个算法很容易拓展到多个server的情形：假设当前状态所有server位于$s_1\leq s_2\leq \cdots \leq s_k$。对于请求$x$，假设$x<s_1$则移动$s_1$，如果$x>s_k$则移动$s_k$，否则它一定位于某个区间$(s_i,s_{i+1})$，那么让$s_i,s_{i+1}$以相同速度靠近直到其中一格先碰到$x$。

## Amortized Analysis

对Double Coverage算法的分析需要用到均摊分析方法(Amortized Analysis)。让我们以对“栈”的分析来回顾用势能函数做均摊分析的过程。某个栈支持两种操作，以常数1的代价push，或以$k$的代价把栈内所有元素都弹出（其中$k$是栈内元素个数）。设栈的大小最多为$m$，那么如果对于每一步做分析我们发现栈的每一步操作我们都只能得到一个代价的上界$m$。设操作总数为$n$，显然总的代价不可能真的达到$n \cdot m$。所以我们可以采取这样一种分析方法：每次一个元素push进栈时，实际产生了代价1，我们再认为它产生了一个潜在的(potential)代价$1$。当栈里有$k$个元素，并需要执行弹出时，我们已经产生了潜在的代价$k$，此时我们把潜在的代价变为实际的，那么弹出操作产生的实际代价就可以看作0。最后我们把实际代价和潜在代价之和看作我们分析的代价的上界，得到总的代价应当有上界$2n$。这就是均摊分析方法，其中用来描述潜在代价的函数称为势能函数(potential function)，记为$\Phi$。在这个例子中，$\Phi(k)=k$，表示栈里有$k$个元素时产生潜在代价$k$。

在这个问题里，我们也会基于算法中对象的状态（server的位置）定义一个势能函数，并把每一步产生的代价看作实际代价和势能函数变化量的和：$cost'(\ALG):=cost(ALG)+\Delta \Phi$。这样，对于整个过程就有$\sum cost'(\ALG)=\sum cost(\ALG)+\Phi_{n}-\Phi_0$。注意，势能函数是基于程序状态的函数，这和物理中势能的定义很类似，累加后我们只需用末状态减去初状态即可。

我们想证明，Double Coverage有$k$的ratio。也即我们想证$\sum cost(\ALG)\leq k\cdot \sum cost(\OPT)$。为此，只需证明每一步都有$cost(\ALG)+\Delta \Phi\leq k\cdot cost(\OPT)$，并且$\Phi_n-\Phi_0\geq 0$。那么，在对Double Coverage的ratio的分析中，我们应当如何设计势能函数呢？可以看到，这里势能函数是用来衡量算法与OPT之间表现的差距的。所以我们考虑$\OPT$算法执行过程中每一步请求以后server位置的状态。对于某一时刻，假设$\OPT$中$k$个server位于$o_1\leq o_2\leq \cdots \leq o_k$，$\ALG$中的$k$个server位于$s_1\leq s_2\leq \cdots \leq s_k$，我们（灵光一闪地）定义势能函数$\Phi=k\cdot M+S$，其中$k$就是server个数，$M=\sum\limits_{i=1}^{k}|s_i-o_i|$，$S=\sum\limits_{i<j}(s_j-s_i)$。这么设计是出于以下考虑：如果$\ALG$中server的分布和$\OPT$中的分布差异越大，之后$\ALG$所需要做的移动潜在的会变多；如果$\ALG$中server间分布得越分散，之后每一次犯错所带来的代价会越严重。可以看到，这样定义的势能函数确实是关于server状态的函数。

下面我们来分析每一次请求将会带来的势能函数的变化量$\Delta \Phi$。由于势能函数是关于状态的函数，我们可以先分析$\OPT$单独移动带来的变化量，再分析$\ALG$单独移动带来的变化量，再把二者累加。首先考虑$\OPT$。对于每个请求，$\OPT$中某一个server的位置会发生变化，假设变化的是$o_t$这个server，那么势能函数发生变化的恰好是$k|s_t-o_t|$这一项，显然这一项的变化量不会超过$k$倍$o_t$移动的距离，也即$k \cdot cost(\OPT)$。再考虑$\ALG$。先考虑请求发生在最右侧（或最左侧）的情况，此时只需移动最右侧的server，假设移动距离为$d$，那么$S$这一项的变化量为$(k-1)d$。并且，请求位置处一定已经存在一个$o_t$了，所以$M$的变化量恰好为$-d$，因此$\Phi$在这一步的总变化量为$-d$；在考虑请求位于$(s_i,s_{i+1})$之间的情况，假设它们各自移动了$d/2$，此时$s_i$与前$i-1$个拉远了$d/2$，$s_{i+1}$与前$i-1$个拉近了$d/2$，$s_{i+1}$与后$k-i-1$个拉远了$d/2$，$s_{i}$与后$k-i-1$个拉近了$d/2$，$s_i$与$s_{i+1}$本身拉近了d，因此综合来看$S$的变化量为$-d$。对于$M$，此时假设$o_t$位于$s_i,s_{i+1}$内部，如果$t\leq i$，那么$|s_i-o_i|$必定$-d/2$；如果$t\geq {i+1}$，那么$|s_{i+1}-o_{i+1}|$必定$-d/2$。而无论$|s_i-o_i|$还是$|s_{i+1}-o_{i+1}|$，增加的都不可能超过$d/2$，综上$M$不可能增大。综合起来，$\ALG$引起的$\Phi$的变化量不超过$-d$，也即$-cost(\ALG)$。累加起来，得到$cost(\ALG)+\Delta \Phi\leq cost(\ALG)+k\cdot (\OPT)-cost(\ALG)=k\cdot cost(\OPT)$。

还需要证明$\Phi_n-\Phi_0\geq 0$。由于初始时我们假定所有server都位于原点，因此$\Phi_0=0$。而$\Phi_n=kM+S\geq 0$，因此成立。

综上，我们得到Double Coverage有$k$的ratio。

## $k$-server on a tree

边权为1的树也可以作为度量空间，我们可以把一维的Double Coverage算法推广到树上，证明这个算法的ratio也不超过$k$。

每当请求树上一个点$x$时，以$x$为根，假想所有server都会朝$x$以相同的速度移动，如果某一时刻某个server成为了另一个server的后代节点，那么显然这个后代节点不应该移动，我们认为它一开始就不应该移动，称它为inactive的server，否则称为active的server。因此我们的算法设计如下：当请求$x$时，令所有active的server移动，直到第一个server碰到$x$。

我们用与一维情况完全类似的均摊分析。令$\Phi=kM+S$，其中$S$定义为$\dfrac{1}{2}\sum\limits_{i,j}dist(s_i,s_j)$，$M$定义为$\min\limits_{\rho}\{\sum\limits_{i=1}^{k}dist(o_i,s_{\rho_i})\}$，其中$\rho$是所有$[k]$的permutation（这么定义是为了效仿一维的情况，但是树上没有一个先天的序关系，所以只能取dist之和最小的那个排列）。那么接下来只需证明对于每一次请求$cost(\ALG)+\Delta \Phi\leq k\cdot cost(\OPT)$。

首先考虑$\OPT$的移动。当$o_t$移动$d$时，$S$不变，$M$的变化不超过$d$，因此$\Delta \Phi$的变化不超过$k \cdot cost(\OPT)$。

再考虑$\ALG$。假设共有$p$个active的server将会移动，且恰好都移动$d$步。考虑$\Delta S$，inactive的server之间两两距离不变；考虑每对active的和inactive的server之间的距离差之和，枚举inactive的server，在一个inactive的server到根节点的链上有且仅有一个active的server，其余$p-1$个active server都在$x$的其它子树上，因此它产生的$S$变化的贡献为$d-(p-1)d$，共有$k-p$个inactive的节点，因此贡献和为$(k-p)(2-p)d$；对于active的和active之间，两两距离减少$2d$，因此总变化量为$-2d\dbinom{p}{2}=-p(p-1)d$。综上，$\Delta S = (2k-pk-p)d$。再考虑$\Delta M$，假设每个$s_i$依然匹配着上一轮的$o_i$，并让最终会到达根节点的那个$s_i$新去匹配位于根节点的那个$o_i$（我们选定了一个特殊的matching，这样会把结果放大），那么$M$至少增大$-d+(p-1)d$。

综上，$\Delta \Phi\leq k\cdot cost(\OPT)+k(p-2)cost(\ALG)+(2k-pk-p)cost(\ALG)$ $=k\cdot cost(\OPT)-p\cdot cost(\ALG)$。因为$p\geq 1$，因此$\Delta \Phi \leq k\cdot cost(\OPT)-cost(\ALG)$，证毕。

## Weighted Paging

带权的paging问题可以用树上的$k$-server解决。假设每个特定页$x$在cache miss的时候的代价不一定是1，而是一个给定的数值$w(x)$，那么我们可以建这样一棵树：假设共有$m$个不同的页，那么让这棵树恰好有$m$个叶节点，叶节点$x$到根节点的距离为$w(x)/2$（不妨认为$w(x)$始终是偶数）。也就是说我们能够得到一个长短参差不齐的star。那么让$k$个server去serve这些叶节点，恰好对应着树上的$k$-server问题。所以我们知道，weighted paging也是$k$ competitive的。

