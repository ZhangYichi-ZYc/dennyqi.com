## 问题描述

Bandit是一种常见的赌博机器。一般的赌场里的Bandit只有一个臂，你可以付钱来拉一次臂，机器会按照一个概率分布返回奖励。因为这样的机器常让赌徒输得精光，所以被称为“bandit(强盗)”。

数学上，我们考虑一个“Multi-Armed Bandit”的模型，它有$k$个臂，当你付钱后你可以任意选择一个臂来拉，不同的臂会对应不同的概率分布来返回奖励。不失一般性，我们可以假设拉一次臂的代价为$1$，第$i$个臂的奖励服从概率分布函数$f_i$，其中$f_{i}\in[0,1]$，其均值为 $\mu_{i}$。

关于Multi-Armed Bandit模型，一个经典的问题是：假设你已经付钱拉$T$轮，那么应该采用什么样的策略来取得尽量高的收益。这样的问题属于“在线优化(online optimization)”领域，其核心在于平衡“探索(exploration)”和“使用(commitment)”：由于我们并不事先知道每个臂的概率分布函数，所以可以想象一个好的策略总是应该把每个臂都拉几次，对每个臂的分布有一个估计以后，再集中地去拉收益估计最高的那几个臂。下面我们就基于这一设想，精确地讨论算法设计，分析算法的表现。

$\newcommand{\E}{\mathbb{E}}$我们先定义一些符号。不失一般性，假设 $\mu_{1}\ge\mu_{2}\ge...\ge\mu_{k}$。记 $\Delta_{i}\triangleq\mu_{1}-\mu_{i}$。设算法在第$t$轮拉动的臂的编号为$a_{t}$，对应的奖励为随机变量$X_{t}\sim f_{a_{t}}$。定义当前算法的regret $R(T)\triangleq T\cdot \mu_{1}-\E[\sum\limits_{t=1}^{T}X_{t}]\ge0$，也即不总是选择第一个臂（这是上帝视角下的最优策略）所造成的regret（这里的期望需考虑到$X$关于分布的随机性，以及算法本身的随机性）。算法的regret越小，说明算法表现越好。在分析时，我们关心当$T$远大于$k$时，$R(T)$函数的增长速度。

在分析算法时，下面形式的regret函数更常用：令随机变量$n_{i}(t)\triangleq\sum\limits_{s=1}^{t}\mathbb{1}[a_{s}=i]$，表示前$t$轮中第$i$个臂被拉动的次数。那么有
$$
\begin{aligned}
R(T)&=T\cdot\mu_{1}-\E[\sum_{t=1}^{T}X_{t}]\\
&=\sum_{t=1}^{T}\left(\mu_1-\sum_{i=1}^{k}\mu_{i}\cdot \E[\mathbb{1}[a_{t}=i]]\right)\\
&=\sum_{t=1}^{T}\sum_{i=1}^{k}\Delta_{i}\cdot \E[\mathbb{1}[a_{t}=i]]\\

&=\sum_{i=1}^{k}\Delta_{i}\cdot \E[\sum_{t=1}^{T}\mathbb{1}[a_{t}=i]]\\

&=\sum_{i=1}^{k}\Delta_{i}\cdot \E[n_{i}(T)]
\end{aligned}
$$
记$R_{i}(T)\triangleq\Delta_{i}\cdot \E[n_{i}(T)]$，那么$R(T)=\sum\limits_{i=1}^{k}R_{i}(T)$。其中$R_i(T)$就称为第$i$个臂上的regret。

首先，我们考虑“只探索”算法：为每个臂分配相同的次数来拉。这样做的regret为$R(T)=\sum\limits_{i=1}^{k}\Delta_i\cdot\dfrac{T}{k}$。可见，“只探索”的做法已经可以做到与$T$成线性关系的regret。所以，我们希望寻找$R(T)=o(T)$的算法。

## The *Explore-then-Commit* Algorithm, ETC

ETC算法首先拉动每个臂$L$次（所以总共进行$k\cdot L$次探索）。计算这$L$次中每个臂的平均奖励$\hat{\mu}_{i}$。此后，总是去拉$\hat{\mu}_{i}$最大的那个臂。

于是我们可以计算regret函数。ETC的策略是确定性的，所以regret函数中期望这一项的随机性来自$f_i$返回奖励的随机性，第$i$个臂期望被拉的次数取决于$\hat \mu_i$“成为最大”的概率：
$$
\begin{aligned}
R(T)&=\sum_{i=1}^{k}\Delta_{i}\cdot \E[n_{i}(T)]\\&=\sum_{i=1}^{k}\Delta_{i}\cdot\left(L+(T-k L)\Pr[\hat{\mu}_{i}\ge\max\limits_{j\ne i}\hat{\mu}_{j}]\right)\\&=L\sum_{i=1}^{k}\Delta_{i}+\sum_{i=2}^{k}\Delta_{i}\cdot(T-kL)\Pr[\hat{\mu}_{i}\ge\max\limits_{j\ne i}\hat{\mu}_{j}]
\end{aligned}
$$
下面我们来寻找$R(T)$的上界，也即$\Pr[\hat{\mu}_{i}\geq\max\limits_{j\ne i}\hat{\mu}_{j}]$的上界。因为$\hat{\mu}_{i}\geq\max\limits_{j\ne i}\hat{\mu}_{j}\implies\hat{\mu}_{i}\geq\hat{\mu}_{1}$，因此$\Pr[\hat{\mu}_{i}\geq\max\limits_{j\ne i}\hat{\mu}_{j}]\le \Pr[\hat{\mu}_{i}\geq\hat{\mu}_{1}]$。所以我们只需给出$\Pr[\hat{\mu}_{i}\geq\hat{\mu}_1]$的上界。

在探索阶段（每个臂拉$L$次的阶段），记第$j$次拉臂$i$时的返回奖励值为随机变量$Y_j^{(i)}$。那么$\Pr[\hat{\mu}_{i}\geq\hat{\mu}_1]=\Pr[\sum\limits_{j=1}^{L}(Y_j^{(i)}-Y_j^{(1)})\geq 0]$。令$Z_{j}=Y_j^{(i)}-Y_j^{(1)}\in[-1,1]$，我们有$\E[Z_{j}]=\mu_j-\mu_1=-\Delta_{i}$。令$Z=\sum\limits_{j=1}^{L}Z_{j}$，我们有$\E[Z]=-L\Delta_{i}$。于是，根据Hoeffding不等式：
$$
\begin{aligned}
\Pr[\hat{\mu}_{i}\ge\hat{\mu}_{1}]&=\Pr[Z\ge 0]\\&=\Pr[Z-\E[Z]\ge L\Delta_{i}]\\&\le \exp\left(-\frac{2(L\Delta_{i})^{2}}{\sum_{j=1}^{L}2^{2}}\right)\\&=\exp\left(-\frac{L\Delta_{i}^{2}}{2}\right)
\end{aligned}
$$


所以

$$
\begin{aligned}
R(T)&\le L\sum_{i=1}^{k}\Delta_{i}+(T-kL)\sum_{i=2}^{k}\Delta_{i}\exp\left(-\frac{L\Delta_{i}^{2}}{2}\right)\\&\leq \sum_{i=1}^{k}\left(L\Delta_{i}+T\Delta_{i}\exp\left(-\frac{L\Delta_{i}^{2}}{2}\right)\right)\\&\le\sum_{i=1}^{k}\left(L+T\Delta_{i}\exp\left(-\frac{L\Delta_{i}^{2}}{2}\right)\right)
\end{aligned}
$$

接下来我们通过调整$L$来得到更好的上界。令$g(L,\Delta_{i})\triangleq L+T\Delta_{i}\exp\left(-\dfrac{L\Delta_{i}^{2}}{2}\right)$。为了方便分析，我们先求出$L$固定时$g$的最大值，然后再求关于$L$的最小值。首先$\dfrac{\partial g(L,\Delta_{i})}{\partial\Delta_{i}}=T(1-L\Delta_{i}^{2})\exp\left(-\dfrac{L\Delta_{i}^{2}}{2}\right)$。显然$\Delta_i=\dfrac{1}{\sqrt{L}}$是极大值点，此时$g(L,\dfrac{1}{\sqrt{L}})=L+\dfrac{T\cdot e^{-1/2}}{\sqrt{L}}$。进而，$\dfrac{\partial g(L,\frac{1}{\sqrt{L}})}{\partial L}=1-\dfrac{e^{-1/2}}{2}TL^{-3/2}$，因此在$L=\left(\dfrac{e^{-1/2}}{2}\right)^{2/3}T^{2/3}$时取到最小值$\dfrac{e^{-1/3}+e^{-5/6}}{2^{2/3}}\cdot T^{2/3}$。

综上所述，$R(T)\leq \dfrac{e^{-1/3}+e^{-5/6}}{2^{2/3}}\cdot k\cdot T^{2/3}=\Theta(k\cdot T^{2/3})$。可以看到，ETC算法可以做到比线性更优。

## The *Upper-Confidence-Bound* Algorithm, UCB

ETC算法在探索阶段平等地对待每一个臂。可以设想，如果想要进一步提升探索效率，可以从探索时得到的反馈动态地调整探索策略本身。这符合算法优化的基本原理：充分利用历史信息。

UCB算法为每个臂$i$维护一个confidence区间$[a_{i}^{(t)},b_{i}^{(t)}]$，每一轮我们都选择$b_i$最高的那个臂$k$，然后根据所得的结果调整区间。难点在于如何调整。UCB设计了一个精妙的关于调整方法的要求：事先设定一个参数$\delta\in[0,1]$，我们要求对于任意时刻$t$，都有$\Pr[\mu_i\in [a_i^{(t)},b_i^{(t)}]]\geq 1-\delta$。注意，这是一个“上帝视角”下的要求，玩家是看不到$\mu_i$的值的。如何实现这一要求呢？我们依然像ETC中一样记录$\hat \mu_i(t)\triangleq\dfrac{\sum_{j=1}^{t}X_j\cdot \mathbb{1}[a_j=i]}{n_i(t)}$。令$Z(t)\triangleq\sum_{j=1}^{t}X_j\cdot \mathbb{1}[a_j=i]$，根据Hoeffding不等式，对于任意的$c$有：

$$
\begin{aligned}
\Pr[|\hat{\mu}_{i}(t)-\mu_i|\geq c]&=\Pr\left[|Z(t)-n_i(t)\mu_i|\geq n_i(t)c\right]\\&\le2\exp\left(-\dfrac{2(n_{i}(t))^2c^{2}}{n_i(t)}\right)\\&=2\exp\left(-2n_{i}(t)c^{2}\right)\\
\end{aligned}
$$

由此可见，$\Pr[|\hat{\mu}_{i}(t)-\mu_i|\leq c]\geq1-2\exp\left(-2n_{i}(t)c^{2}\right)$，因此$\Pr[\mu_i\in[\hat{\mu}_i(t)-c,\hat{\mu}_i(t)+c]]\geq 1-2\exp\left(-2n_{i}(t)c^{2}\right)$。所以为了满足要求，我们需要$1-2\exp\left(-2n_{i}(t)c^{2}\right)\geq 1-\delta$，也即$c\geq\sqrt{\dfrac{\ln(2/\delta)}{2n_{i}(t)}}$。

因此，UCB的做法是：取$a_{i}^{(t)}\triangleq\hat{\mu}_{i}(t)-c_{i}(t)$ 和 $b_{i}^{(t)}\triangleq\hat{\mu}_{i}(t)+c_{i}(t)$，其中$c_i(t)=\sqrt{\dfrac{\ln(2/\delta)}{2n_{i}(t)}}$。注意到在这样的设计下，当$\hat{\mu}_{i}(t)$很大或$n_{i}(t)$ 很小时，算法都会倾向于去探索臂$i$。

下面我们分析UCB的regret上界。

$$
\begin{aligned}
R_{i}(T)&=\Delta_{i}\cdot\E[n_{i}(T)]\\&=\Delta_{i}\sum_{t=1}^{T}\Pr[\hat{\mu}_{i}(t)+c_{i}(t)\ge \max_{j\ne i}(\hat{\mu}_{j}(t)+c_{j}(t))]
\end{aligned}
$$

注意到，在算法执行过程中有概率出现这样的情况：对于每个$i$，$\mu_{i}$在任意时刻都落在$[a_{i}(t),b_{i}(t)]$内。我们把这一情况记为事件$\mathcal{A}$。$\mathcal{A}$事件是大概率发生的。若$\mathcal{A}$不发生，则至少在某一时刻存在某一个$i$，发生了事件“$\mu_i \notin [a_{i}(t), b_{i}(t)]$”。根据算法的设计，对于任意某个$t,i$，事件“$\mu_i \notin [a_{i}(t), b_{i}(t)]$”发生的概率小于$\delta$。所以由Union Bound可得$\Pr[\overline{\mathcal{A}}]\le kT\delta$。
$$
\begin{aligned}
R_{i}(T)&\le\Delta_{i}\sum_{t=1}^{T}\Pr[\hat{\mu}_{i}(t)+c_{i}(t)\ge \max_{j\ne i}(\hat{\mu}_{j}(t)+c_{j}(t))\mid \mathcal{A}]+\Delta_i\sum\limits_{t=1}^{T}\Pr[\overline{\mathcal{A}}]
\end{aligned}
$$
那么，只要在最初设定$\delta\triangleq \dfrac{1}{T^2}$，就有$\sum\limits_{t=1}^{T}\Pr[\overline{\mathcal{A}}]\le T\cdot kT\cdot\dfrac{1}{T^{2}}=k$

而当事件$\mathcal{A}$发生时，总是成立

$$
\hat{\mu}_{i}(t)+c_{i}(t)\le(\mu_{i}+c_{i}(t))+c_{i}(t)=\mu_{i}+2c_{i}(t)
$$

$$
\hat{\mu}_{1}(t)+c_{1}(t)\ge(\mu_{1}-c_{1}(t))+c_{1}(t)=\mu_{1}
$$

因此，只要发生$\mu_{i}+2c_{i}(t)<\mu_{1}$，臂$i$就不可能被当前的第$t$轮选中（$i\neq 1$）。其中，$\mu_{i}+2c_{i}(t)<\mu_{1}$当且仅当$c_i(t)<\dfrac{\Delta_i}{2}$，也即$\sqrt{\dfrac{\ln(2/\delta)}{2n_{i}(t)}}\le\dfrac{\Delta_{i}}{2}$，也即$n_{i}(t)\ge\dfrac{4\ln(\sqrt{2}t)}{\Delta_{i}^{2}}$。所以如果臂$i$被选中，也即如果$\hat{\mu}_{i}(t)+c_{i}(t)\ge \max\limits_{j\ne i}(\hat{\mu}_{j}(t)+c_{j}(t))$，就一定有$n_{i}(t)<\dfrac{4\ln(\sqrt{2}t)}{\Delta_{i}^{2}}$。其中，$n_i(t)=\sum\limits_{s=1}^{t}\mathbb{1}[a_{s}=i]=\sum\limits_{t=1}^{T}\mathbb{1}[\hat{\mu}_{i}(t)+c_{i}(t) \ge \max\limits_{j\ne i}(\hat{\mu}_{j}(t)+c_{j}(t))]$。那么：

$$
\begin{aligned}
&\sum\limits_{t=1}^{T}\Pr[\hat{\mu}_{i}(t)+c_{i}(t)\ge \max\limits_{j\ne i}(\hat{\mu}_{j}(t)+c_{j}(t))\mid \mathcal{A}]\\=  &\E\left[\sum\limits_{t=1}^{T}\mathbb{1}[\hat{\mu}_{i}(t)+c_{i}(t) \ge \max\limits_{j\ne i}(\hat{\mu}_{j}(t)+c_{j}(t))]\mid \mathcal{A}\right]\\ =  &\E[n_i(T)\mid \mathcal{A}]\\< &\dfrac{4\ln(\sqrt{2}T)}{\Delta_{i}^{2}}
\end{aligned}
$$

至此，我们已经得到了$R(T)$的一个关于$\Delta_i$的上界$\sum\limits_{i\in[k]}\dfrac{4\ln(\sqrt{2}T)}{\Delta_{i}}+k\sum\limits_{i\in[k]}\Delta_i$。这个上界在$\Delta_{i}$很小时可能会非常大。不过，当$\Delta_{i}$很小时，其对regret的贡献也很小。我们可以采用truncation，分析如下：

将$k$个臂分为$\Delta_{i}\le\Delta$和$\Delta_{i}>\Delta$两组（其中，$\Delta$是一个特别设定的阈值）。然后我们可以分别计算相应的regret如下：

$$
\begin{aligned}
R(T)&=\sum_{i=1}^{k}\Delta_{i}\E[n_{i}(T)]\\

&=\sum_{i:\Delta_{i}\le\Delta}\Delta_{i}\E[n_{i}(T)]+\sum_{i:\Delta_{i}>\Delta}\Delta_{i}\E[n_{i}(T)]\\

&\le T\Delta+\sum_{i:\Delta_{i}>\Delta}\Delta_{i}(\frac{4\ln(\sqrt{2}T)}{\Delta_{i}^{2}}+k)\\

&\le T\Delta+\frac{4\ln(\sqrt{2}T)}{\Delta}+k^{2}
\end{aligned}
$$

取$\Delta=\sqrt{\dfrac{4k\ln(\sqrt{2}T)}{T}}$，我们有$R(T)\leq \Theta(\sqrt{kT\ln T})$。

Multi-Armed Bandit问题的理论下界是$\Theta(\sqrt{kT})$。UCB算法与之仍相差一个$\sqrt{\ln T}$的因子。

## Reference

 CS3936: Topics in Modern Algorithms, Lecture 4, *Chihao Zhang*, SJTU