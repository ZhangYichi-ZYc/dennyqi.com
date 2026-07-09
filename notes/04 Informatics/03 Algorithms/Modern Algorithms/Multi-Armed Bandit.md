# Multi-Armed Bandit 算法

## 问题描述

Bandit是一种常见的赌博机器。一般的赌场里的Bandit只有一个臂，你可以付钱来拉一次臂，机器会按照一个概率分布返回奖励。因为这样的机器常让赌徒输得精光，所以被称为"bandit（强盗）"。

数学上，我们考虑一个"Multi-Armed Bandit"的模型，它有 $k$ 个臂，当你付钱后你可以任意选择一个臂来拉，不同的臂会对应不同的概率分布来返回奖励。不失一般性，我们可以假设拉一次臂的代价为 $1$，第 $i$ 个臂的奖励服从概率分布函数 $f_i$，其中 $f_i \in [0,1]$，其均值为 $\mu_i$。

关于Multi-Armed Bandit模型，一个经典的问题是：假设你已经付钱拉 $T$ 轮，那么应该采用什么样的策略来取得尽量高的收益。这样的问题属于"在线优化（online optimization）"领域，其核心在于平衡"探索（exploration）"和"使用（commitment）"：由于我们并不事先知道每个臂的概率分布函数，所以可以想象一个好的策略总是应该把每个臂都拉几次，对每个臂的分布有一个估计以后，再集中地去拉收益估计最高的那几个臂。下面我们就基于这一设想，精确地讨论算法设计，分析算法的表现。

我们先定义一些符号。不失一般性，假设 $\mu_1 \ge \mu_2 \ge \cdots \ge \mu_k$。记 $\Delta_i \triangleq \mu_1 - \mu_i$。设算法在第 $t$ 轮拉动的臂的编号为 $a_t$，对应的奖励为随机变量 $X_t \sim f_{a_t}$。定义当前算法的regret

$$
R(T) \triangleq T \cdot \mu_1 - \mathbb{E}\left[\sum_{t=1}^{T} X_t\right] \ge 0
$$

也即不总是选择第一个臂（这是上帝视角下的最优策略）所造成的regret（这里的期望需考虑到 $X$ 关于分布的随机性，以及算法本身的随机性）。算法的regret越小，说明算法表现越好。在分析时，我们关心当 $T$ 远大于 $k$ 时，$R(T)$ 函数的增长速度。

在分析算法时，下面形式的regret函数更常用：令随机变量

$$
n_i(t) \triangleq \sum_{s=1}^{t} \mathbb{1}[a_s = i]
$$

表示前 $t$ 轮中第 $i$ 个臂被拉动的次数。那么有

$$
\begin{aligned}
R(T)
&= T \cdot \mu_1 - \mathbb{E}\left[\sum_{t=1}^{T} X_t\right] \\
&= \sum_{t=1}^{T} \left( \mu_1 - \sum_{i=1}^{k} \mu_i \cdot \mathbb{E}[\mathbb{1}[a_t = i]] \right) \\
&= \sum_{t=1}^{T} \sum_{i=1}^{k} \Delta_i \cdot \mathbb{E}[\mathbb{1}[a_t = i]] \\
&= \sum_{i=1}^{k} \Delta_i \cdot \mathbb{E}\left[\sum_{t=1}^{T} \mathbb{1}[a_t = i]\right] \\
&= \sum_{i=1}^{k} \Delta_i \cdot \mathbb{E}[n_i(T)]
\end{aligned}
$$

记 $R_i(T) \triangleq \Delta_i \cdot \mathbb{E}[n_i(T)]$，那么 $R(T) = \sum_{i=1}^{k} R_i(T)$。其中 $R_i(T)$ 就称为第 $i$ 个臂上的regret。

首先，我们考虑"只探索"算法：为每个臂分配相同的次数来拉。这样做的regret为

$$
R(T) = \sum_{i=1}^{k} \Delta_i \cdot \dfrac{T}{k}
$$

可见，"只探索"的做法已经可以做到与 $T$ 成线性关系的regret。所以，我们希望寻找 $R(T) = o(T)$ 的算法。

---

## The *Explore-then-Commit* Algorithm, ETC

ETC算法首先拉动每个臂 $L$ 次（所以总共进行 $k \cdot L$ 次探索）。计算这 $L$ 次中每个臂的平均奖励 $\hat{\mu}_i$。此后，总是去拉 $\hat{\mu}_i$ 最大的那个臂。

于是我们可以计算regret函数。ETC的策略是确定性的，所以regret函数中期望这一项的随机性来自 $f_i$ 返回奖励的随机性，第 $i$ 个臂期望被拉的次数取决于 $\hat{\mu}_i$"成为最大"的概率：

$$
\begin{aligned}
R(T)
&= \sum_{i=1}^{k} \Delta_i \cdot \mathbb{E}[n_i(T)] \\
&= \sum_{i=1}^{k} \Delta_i \cdot \left( L + (T - kL) \Pr\left[\hat{\mu}_i \ge \max_{j \ne i} \hat{\mu}_j\right] \right) \\
&= L \sum_{i=1}^{k} \Delta_i + \sum_{i=2}^{k} \Delta_i \cdot (T - kL) \Pr\left[\hat{\mu}_i \ge \max_{j \ne i} \hat{\mu}_j\right]
\end{aligned}
$$

下面我们来寻找 $R(T)$ 的上界，也即 $\Pr[\hat{\mu}_i \ge \max_{j \ne i} \hat{\mu}_j]$ 的上界。因为

$$
\hat{\mu}_i \ge \max_{j \ne i} \hat{\mu}_j \implies \hat{\mu}_i \ge \hat{\mu}_1
$$

因此 $\Pr[\hat{\mu}_i \ge \max_{j \ne i} \hat{\mu}_j] \le \Pr[\hat{\mu}_i \ge \hat{\mu}_1]$。所以我们只需给出 $\Pr[\hat{\mu}_i \ge \hat{\mu}_1]$ 的上界。

在探索阶段（每个臂拉 $L$ 次的阶段），记第 $j$ 次拉臂 $i$ 时的返回奖励值为随机变量 $Y_j^{(i)}$。那么

$$
\Pr[\hat{\mu}_i \ge \hat{\mu}_1] = \Pr\left[\sum_{j=1}^{L} (Y_j^{(i)} - Y_j^{(1)}) \ge 0\right]
$$

令 $Z_j = Y_j^{(i)} - Y_j^{(1)} \in [-1, 1]$，我们有 $\mathbb{E}[Z_j] = \mu_j - \mu_1 = -\Delta_i$。令 $Z = \sum_{j=1}^{L} Z_j$，我们有 $\mathbb{E}[Z] = -L\Delta_i$。于是，根据Hoeffding不等式：

$$
\begin{aligned}
\Pr[\hat{\mu}_i \ge \hat{\mu}_1]
&= \Pr[Z \ge 0] \\
&= \Pr[Z - \mathbb{E}[Z] \ge L\Delta_i] \\
&\le \exp\left( -\frac{2(L\Delta_i)^2}{\sum_{j=1}^{L} 2^2} \right) \\
&= \exp\left( -\frac{L\Delta_i^2}{2} \right)
\end{aligned}
$$

所以

$$
\begin{aligned}
R(T)
&\le L \sum_{i=1}^{k} \Delta_i + (T - kL) \sum_{i=2}^{k} \Delta_i \exp\left( -\frac{L\Delta_i^2}{2} \right) \\
&\le \sum_{i=1}^{k} \left( L\Delta_i + T\Delta_i \exp\left( -\frac{L\Delta_i^2}{2} \right) \right) \\
&\le \sum_{i=1}^{k} \left( L + T\Delta_i \exp\left( -\frac{L\Delta_i^2}{2} \right) \right)
\end{aligned}
$$

接下来我们通过调整 $L$ 来得到更好的上界。令

$$
g(L, \Delta_i) \triangleq L + T\Delta_i \exp\left( -\frac{L\Delta_i^2}{2} \right)
$$

为了方便分析，我们先求出 $L$ 固定时 $g$ 的最大值，然后再求关于 $L$ 的最小值。首先

$$
\frac{\partial g(L, \Delta_i)}{\partial \Delta_i}
= T(1 - L\Delta_i^2) \exp\left( -\frac{L\Delta_i^2}{2} \right)
$$

显然 $\Delta_i = \dfrac{1}{\sqrt{L}}$ 是极大值点，此时

$$
g\left(L, \dfrac{1}{\sqrt{L}}\right) = L + \dfrac{T \cdot e^{-1/2}}{\sqrt{L}}
$$

进而，

$$
\frac{\partial g(L, 1/\sqrt{L})}{\partial L}
= 1 - \dfrac{e^{-1/2}}{2} T L^{-3/2}
$$

因此在 $L = \left( \dfrac{e^{-1/2}}{2} \right)^{2/3} T^{2/3}$ 时取到最小值 $\dfrac{e^{-1/3} + e^{-5/6}}{2^{2/3}} \cdot T^{2/3}$。

综上所述，

$$
R(T) \le \dfrac{e^{-1/3} + e^{-5/6}}{2^{2/3}} \cdot k \cdot T^{2/3} = \Theta(k \cdot T^{2/3})
$$

可以看到，ETC算法可以做到比线性更优。

---

## The *Upper-Confidence-Bound* Algorithm, UCB

ETC算法在探索阶段平等地对待每一个臂。可以设想，如果想要进一步提升探索效率，可以从探索时得到的反馈动态地调整探索策略本身。这符合算法优化的基本原理：充分利用历史信息。

UCB算法为每个臂 $i$ 维护一个confidence区间 $[a_i^{(t)}, b_i^{(t)}]$，每一轮我们都选择 $b_i$ 最高的那个臂 $k$，然后根据所得的结果调整区间。难点在于如何调整。UCB设计了一个精妙的关于调整方法的要求：事先设定一个参数 $\delta \in [0,1]$，我们要求对于任意时刻 $t$，都有

$$
\Pr[\mu_i \in [a_i^{(t)}, b_i^{(t)}]] \ge 1 - \delta
$$

注意，这是一个"上帝视角"下的要求，玩家是看不到 $\mu_i$ 的值的。如何实现这一要求呢？我们依然像ETC中一样记录

$$
\hat{\mu}_i(t) \triangleq \dfrac{\sum_{j=1}^{t} X_j \cdot \mathbb{1}[a_j = i]}{n_i(t)}
$$

令 $Z(t) \triangleq \sum_{j=1}^{t} X_j \cdot \mathbb{1}[a_j = i]$，根据Hoeffding不等式，对于任意的 $c$ 有：

$$
\begin{aligned}
\Pr[|\hat{\mu}_i(t) - \mu_i| \ge c]
&= \Pr\left[|Z(t) - n_i(t)\mu_i| \ge n_i(t)c\right] \\
&\le 2 \exp\left( -\dfrac{2(n_i(t))^2 c^2}{n_i(t)} \right) \\
&= 2 \exp\left( -2n_i(t)c^2 \right)
\end{aligned}
$$

由此可见，

$$
\Pr[|\hat{\mu}_i(t) - \mu_i| \le c] \ge 1 - 2\exp\left( -2n_i(t)c^2 \right)
$$

因此

$$
\Pr[\mu_i \in [\hat{\mu}_i(t) - c, \hat{\mu}_i(t) + c]] \ge 1 - 2\exp\left( -2n_i(t)c^2 \right)
$$

所以为了满足要求，我们需要

$$
1 - 2\exp\left( -2n_i(t)c^2 \right) \ge 1 - \delta
$$

也即

$$
c \ge \sqrt{\dfrac{\ln(2/\delta)}{2n_i(t)}}
$$

因此，UCB的做法是：取

$$
a_i^{(t)} \triangleq \hat{\mu}_i(t) - c_i(t), \qquad b_i^{(t)} \triangleq \hat{\mu}_i(t) + c_i(t)
$$

其中

$$
c_i(t) = \sqrt{\dfrac{\ln(2/\delta)}{2n_i(t)}}
$$

注意到在这样的设计下，当 $\hat{\mu}_i(t)$ 很大或 $n_i(t)$ 很小时，算法都会倾向于去探索臂 $i$。

下面我们分析UCB的regret上界。

$$
\begin{aligned}
R_i(T)
&= \Delta_i \cdot \mathbb{E}[n_i(T)] \\
&= \Delta_i \sum_{t=1}^{T} \Pr\left[\hat{\mu}_i(t) + c_i(t) \ge \max_{j \ne i} (\hat{\mu}_j(t) + c_j(t))\right]
\end{aligned}
$$

注意到，在算法执行过程中有概率出现这样的情况：对于每个 $i$，$\mu_i$ 在任意时刻都落在 $[a_i(t), b_i(t)]$ 内。我们把这一情况记为事件 $\mathcal{A}$。$\mathcal{A}$ 事件是大概率发生的。若 $\mathcal{A}$ 不发生，则至少在某一时刻存在某一个 $i$，发生了事件"$\mu_i \notin [a_i(t), b_i(t)]$"。根据算法的设计，对于任意某个 $t,i$，事件"$\mu_i \notin [a_i(t), b_i(t)]$"发生的概率小于 $\delta$。所以由Union Bound可得 $\Pr[\overline{\mathcal{A}}] \le kT\delta$。

$$
\begin{aligned}
R_i(T)
&\le \Delta_i \sum_{t=1}^{T} \Pr\left[\hat{\mu}_i(t) + c_i(t) \ge \max_{j \ne i} (\hat{\mu}_j(t) + c_j(t)) \mid \mathcal{A}\right] \\
&\quad + \Delta_i \sum_{t=1}^{T} \Pr[\overline{\mathcal{A}}]
\end{aligned}
$$

那么，只要在最初设定 $\delta \triangleq \dfrac{1}{T^2}$，就有

$$
\sum_{t=1}^{T} \Pr[\overline{\mathcal{A}}] \le T \cdot kT \cdot \dfrac{1}{T^2} = k
$$

而当事件 $\mathcal{A}$ 发生时，总是成立

$$
\hat{\mu}_i(t) + c_i(t) \le (\mu_i + c_i(t)) + c_i(t) = \mu_i + 2c_i(t)
$$

$$
\hat{\mu}_1(t) + c_1(t) \ge (\mu_1 - c_1(t)) + c_1(t) = \mu_1
$$

因此，只要发生 $\mu_i + 2c_i(t) < \mu_1$，臂 $i$ 就不可能被当前的第 $t$ 轮选中（$i \neq 1$）。其中，$\mu_i + 2c_i(t) < \mu_1$ 当且仅当 $c_i(t) < \dfrac{\Delta_i}{2}$，也即

$$
\sqrt{\dfrac{\ln(2/\delta)}{2n_i(t)}} \le \dfrac{\Delta_i}{2}
$$

也即

$$
n_i(t) \ge \dfrac{4\ln(\sqrt{2}t)}{\Delta_i^2}
$$

所以如果臂 $i$ 被选中，也即如果 $\hat{\mu}_i(t) + c_i(t) \ge \max_{j \ne i} (\hat{\mu}_j(t) + c_j(t))$，就一定有

$$
n_i(t) < \dfrac{4\ln(\sqrt{2}t)}{\Delta_i^2}
$$

其中

$$
n_i(t) = \sum_{s=1}^{t} \mathbb{1}[a_s = i]
= \sum_{t=1}^{T} \mathbb{1}\left[\hat{\mu}_i(t) + c_i(t) \ge \max_{j \ne i} (\hat{\mu}_j(t) + c_j(t))\right]
$$

那么：

$$
\begin{aligned}
&\sum_{t=1}^{T} \Pr\left[\hat{\mu}_i(t) + c_i(t) \ge \max_{j \ne i} (\hat{\mu}_j(t) + c_j(t)) \mid \mathcal{A}\right] \\
&= \mathbb{E}\left[\sum_{t=1}^{T} \mathbb{1}\left[\hat{\mu}_i(t) + c_i(t) \ge \max_{j \ne i} (\hat{\mu}_j(t) + c_j(t))\right] \mid \mathcal{A}\right] \\
&= \mathbb{E}[n_i(T) \mid \mathcal{A}] \\
&< \dfrac{4\ln(\sqrt{2}T)}{\Delta_i^2}
\end{aligned}
$$

至此，我们已经得到了 $R(T)$ 的一个关于 $\Delta_i$ 的上界

$$
\sum_{i \in [k]} \dfrac{4\ln(\sqrt{2}T)}{\Delta_i} + k \sum_{i \in [k]} \Delta_i
$$

这个上界在 $\Delta_i$ 很小时可能会非常大。不过，当 $\Delta_i$ 很小时，其对regret的贡献也很小。我们可以采用truncation，分析如下：

将 $k$ 个臂分为 $\Delta_i \le \Delta$ 和 $\Delta_i > \Delta$ 两组（其中，$\Delta$ 是一个特别设定的阈值）。然后我们可以分别计算相应的regret如下：

$$
\begin{aligned}
R(T)
&= \sum_{i=1}^{k} \Delta_i \mathbb{E}[n_i(T)] \\
&= \sum_{i:\Delta_i \le \Delta} \Delta_i \mathbb{E}[n_i(T)] + \sum_{i:\Delta_i > \Delta} \Delta_i \mathbb{E}[n_i(T)] \\
&\le T\Delta + \sum_{i:\Delta_i > \Delta} \Delta_i \left( \frac{4\ln(\sqrt{2}T)}{\Delta_i^2} + k \right) \\
&\le T\Delta + \frac{4\ln(\sqrt{2}T)}{\Delta} + k^2
\end{aligned}
$$

取 $\Delta = \sqrt{\dfrac{4k\ln(\sqrt{2}T)}{T}}$，我们有

$$
R(T) \le \Theta\left(\sqrt{kT\ln T}\right)
$$

Multi-Armed Bandit问题的理论下界是 $\Theta(\sqrt{kT})$。UCB算法与之仍相差一个 $\sqrt{\ln T}$ 的因子。

---

## Reference

CS3936: Topics in Modern Algorithms, Lecture 4, *Chihao Zhang*, SJTU