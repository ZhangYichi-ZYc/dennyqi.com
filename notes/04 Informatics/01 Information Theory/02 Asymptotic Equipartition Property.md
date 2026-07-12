## 渐进均分性(Asymptotic Equipartition Property, AEP)

$\newcommand{\E}{\mathbb{E}}$在概率论中，我们有（弱）大数定理：对于一列独立同分布的随机变量$X_1,X_2,\cdots$。设$X_i\sim X$。前$n$个随机变量的平均值$\dfrac{1}{n}\sum\limits_{i=1}^{n}X_i$（依然是一个随机变量）当$n\to\infty$时会<u>依概率</u>收敛到$\E [X]$。$\forall\varepsilon>0,\lim\limits_{n\to\infty}\Pr\left[\left|\dfrac{1}{n}\sum\limits_{i=1}^{n}X_i-\E[X]\right|>\varepsilon\right]=0$。

从信息论的角度如何理解大数定律呢？对于独立同分布的随机变量$X_1,X_2,\cdots$，我们只关注它们的分布，并对每个取值的概率取对数，得到的一列随机变量$\log p(X_1),\log p(X_2),\cdots$显然也是独立同分布的。那么根据大数定理，$\dfrac{1}{n}\sum\limits_{i=1}^{n}\log p(X_i)$将会依概率收敛到$\E[\log p(X)]$，这恰好是熵$H(X)$（的相反数）！我们试着理解左边那一项有什么含义：$\sum\limits_{i=1}^{n}\log p(X_i)$可以写成$\log \left(p(X_1)p(X_2)\cdots p(X_n)\right)$，由于$p(X_i)$是互相独立的，这等价于$\log p(X_1,X_2,\cdots,X_n)$。这是一个随机变量，表示每种<u>序列</u>出现的概率（的对数）。现在大数定律告诉我们，当$n$充分大时，$\log p(X_1,X_2,\cdots,X_n)$有极大的概率取值为$-H(X)$，也就是说$p(X_1,X_2,\cdots,X_n)$有极大的概率取值为$2^{-nH(X_1)}$。这说明，大多数的序列出现的概率实际上是相等的，它们在渐进意义下均分了总概率。在信息论中，我们把这样的性质称为“渐进均分性(AEP)”。

为了更精确的讨论这种“充分接近”，我们把概率分布在$[2^{-n(H(X_1)+\epsilon)},2^{-n(H(X_1)-\epsilon)}]$的序列收集进集合$A_\epsilon^{(n)}$，把这个集合称为$\epsilon$-典型集(Typical Set)。典型集本质上是一个事件（因为它是样本的一个集合），根据弱大数定理的依概率收敛，典型集的概率满足$\Pr[A_\epsilon^{(n)}]>1-\epsilon$。$n\to\infty$时，典型集的概率趋向1。同时，我们对典型集中的序列个数也有一个估计。由于典型集中序列的概率有下界$2^{-n(H(X_1)+\epsilon)}$，因此其中的序列个数满足$1\geq \sum\limits_{x\in A_\epsilon^{(n)}}p(x)\geq |A_\epsilon^{(n)}|2^{-n(H(X_1)+\epsilon)}$，因此序列个数有上界$2^{n(H(X_1)+\epsilon)}$；同理，典型集中序列的概率有上界$2^{-n(H(X_1)-\epsilon)}$，因此$1-\epsilon<\Pr[A_\epsilon^{(n)}]= \sum\limits_{x\in A_\epsilon^{(n)}}p(x)\leq |A_\epsilon^{(n)}|2^{-n(H(X_1)-\epsilon)}$，因此序列个数有下界$(1-\epsilon)2^{n(H(X_1)-\epsilon)}$。这说明，$(1-\epsilon)2^{n(H(X_1)-\epsilon)}\leq|A_\epsilon^{(n)}|\leq2^{n(H(X_1)+\epsilon)}$，也即有极大的概率典型集中的序列个数就分布在$2^{nH(X_1)}$附近。这样我们就精确验证了这种均分性。

典型集的大小只有$2^{nH(X_1)}$，相比于全集（大小为$|\mathcal{X}|^n$）而言只占了相当小的一部分。可典型集却占有着大部分的概率权重。所以我们称它是一个高概率集(High Probability Set)。事实上我们可以证明，典型集<u>几乎就是</u>样本空间里能占有这么大概率权重的<u>最小集合</u>了。我们定义$B_\delta^{(n)}\subseteq X^n$是最小的满足$\Pr[B_\delta^{(n)}]\geq 1-\delta$的集合。假如已知$\Pr[A_\epsilon^{(n)}]>1-\epsilon$，那么显然有$\Pr[A_\epsilon^{(n)}\cap B_\delta^{(n)}]>1-\delta-\epsilon$。而$Pr[A_\epsilon^{(n)}\cap B_\delta^{(n)}]=\sum\limits_{x^n \in A_\epsilon^{(n)}\cap B_\delta^{(n)}}p(x^n)$，典型集中的$p(x^n)\leq 2^{-n(H(X)-\epsilon)}$，因此$1-\delta-\epsilon \leq |A_\epsilon^{(n)}\cap B_\delta^{(n)}|2^{-n(H(X)-\epsilon)}\leq |B_\delta^{(n)}|2^{-n(H(X)-\epsilon)}$，因此$|B_\delta^{(n)}|\geq (1-\delta-\epsilon)2^{n(H(X)-\epsilon)}$。因此在指数的一阶近似意义下，可以说$B_\delta^{(n)}$至少有$2^{nH(X)}$个元素，与$A_\epsilon^{(n)}$中的元素个数相等。可见典型集在指数的一阶近似意义下是占有该概率权重的最小集合了。

## 基于AEP的编码

通过以下这种基于AEP的编码方式，我们能够初次看到熵在刻画平均意义下编码一个随机变量所需要的位数。

对于随机变量$X$，我们可以采用下面这样的一种相当简单粗暴的编码方式。这种编码方式绝不是最优的，但它能反映出一些熵在描述的事实。我们取足够多的相同的$X$形成一列独立同分布的随机变量列$X_1,X_2,\cdots$。对于足够大的$n$，根据渐进均分性，我们知道绝大多数序列都会出现在典型集中。典型集中的序列个数有极大的概率在$2^{nH(X)}$左右。而所有可能的序列个数共为$|\mathcal{X}|^n$。现在我们要给每个序列一个编码，使得编码尽可能短，但又能和序列间形成双射。我们先对典型集中的序列依次编码，由于总个数为$2^{nH(X)}$，所以二进制编码需要至少$nH(X)$。为了处理小数向上取整的情况，我们加上1，也就是说极大概率下$nH(X)+1$就能完成典型集内的编码。而典型集外的序列无论如何也不超过$|\mathcal{X}|^n$个，因此编码所需要的位数为$n\log |\mathcal{X}|+1$。为了区分典型集内与典型集外的序列，我们附加上一个标识位。这样，我们就用$nH(X)+2$位编码了典型集内的序列，用$n\log |\mathcal{X}|+2$编码了典型集外的序列。在这样的编码下，期望意义上一个长度为$n$的序列是多少位的呢？$\E[l(X^n)]=\sum\limits_{x^n}p(x^n)l(x^n)$ $=(1-\epsilon)(nH(X)+2)+\epsilon(n\log |\mathcal{X}|+2)$$=nH(X)+2+\epsilon n(\log|\mathcal{X}|-H(X))$ $\leq n[H(X)+\dfrac{2}{n}+\epsilon\log |\mathcal{X}|]$。可见当$n$充分大时，存在一个可以充分小的$\epsilon'$使得$\E[l(X^n)]\leq n(H(X)+\epsilon')$。这也说明如果仅对一个随机变量$X$编码，所需要的位数不超过$H(X)+\epsilon'$。——熵刻画了给一个随机变量做最优编码所需要的位数的一个上界！

在之后的讨论中，我们还会证明熵也是一个最优编码的下界。

## 联合渐进均分性(Joint AEP)

对于两列随机变量，$\{X_1,\cdots,X_n,\cdots\}$，简记为$\{X^n\}$；$\{Y_1,\cdots,Y_n,\cdots\}$，简记为$\{Y^n\}$。假设$\{X^n\}$和$\{Y^n\}$都是独立同分布的。那么$p(x^n,y^n)=\prod\limits_{i=1}^{n}p(x_i,y_i)$。单变量的AEP告诉我们，当$n$充分大时，$X^n$依概率收敛于$2^{-nH(X)}$，$Y^n$依概率收敛于$2^{-nH(Y)}$。那么，每个$(x^n,y^n)$的概率渐近均分意义下是多少呢？这就是联合AEP问题。如果把每一对$(X,Y)$看作一个向量值的随机变量（我们就是这么理解联合熵的），那么我们期待我们可以直接应用一元时的结论，也即$p(x^n,y^n)$渐近均分意义下取$2^{-nH(X,Y)}$。换言之，我们可以把多元当作一元来看待。这也是容易验证的：根据弱大数定理，$-\dfrac{1}{n}\log p(X^n,Y^n)=-\dfrac{1}{n}\sum\limits_{i=1}^{n} \log p(X_i,Y_i)$。当$n\to\infty$时，它依概率收敛于$-\E[\log p(X,Y)]=H(X,Y)$。因此$p(X^n,Y^n)$依概率收敛于$2^{-nH(X,Y)}$。

此时，我们的典型集$A_\epsilon^{(n)}$不仅可以包括概率分布在$[2^{-n(H(X,Y)+\epsilon)},2^{-n(H(X,Y)-\epsilon)}]$内的所有$(x^n,y^n)$，我们可以证明在此基础上增加限制条件，要求$x^n$也要分布在$[2^{-n(H(X)+\epsilon)},2^{-n(H(X)-\epsilon)}]$，$y^n$也要分布在$[2^{-n(H(Y)+\epsilon)},2^{-n(H(Y)-\epsilon)}]$，依然构成一个典型集（也即在$n\to\infty$时$\Pr[A_\epsilon^{(n)}]\to 1$）。也就是说，典型集现在定义为$A_\epsilon^{(n)}=\{(x^n,y^n)\mid \left|-\dfrac{1}{n}\log p(x^n)-H(X)\right|<\epsilon,$ $\left|-\dfrac{1}{n}\log p(y^n)-H(Y)\right|<\epsilon,$$\left|-\dfrac{1}{n}\log p(x^n,y^n)-H(X,Y)\right|<\epsilon\}$。证明是容易的，因为这三者都是依概率收敛的，对于任意给定的$\epsilon$，我们总是可以找到对应的$n_1,n_2,n_3$使它们分别小于$\epsilon/3$，那么只需取$\max\{n_1,n_2,n_3\}$即可。和一元时一样，我们可以给出典型集大小的上下界：$(1-\epsilon)2^{n(H(X,Y)-\epsilon)}\leq|A_\epsilon^{(n)}|\leq 2^{n(H(X,Y)+\epsilon)}$。



































