## Temporal-Difference Learning

让我们再回顾一下贝尔曼方程。在给定模型（给定 $p_\delta$）时，我们可以对于给定的策略 $\pi$，用公式 $v_\pi (s)=\sum\limits_{a}\pi(a\mid s)\left[\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \sum\limits_{s'}p_\delta(s'\mid s,a)\cdot v_\pi(s')\right]$ 求出每个状态 $s$ 的状态值。我们在蒙特卡罗方法一文中提到，因为现实中大多数 $p_\delta$ 可能并不能被提前建模，所以需要用"采样"的方法来得到概率 $p_\delta$。基础的蒙特卡罗方法，需要采样足够多次才能得出一个相对准确的估计。我们也提出了一系列优化方案，来降低所需的采样次数。本文我们将介绍一类特殊的优化方案，称为时序差分方法 (Temporal-Difference Learning)。

给定策略 $\pi$，在贝尔曼方程中的 $\sum\limits_{a}\pi(a\mid s)\sum\limits_{r}r\cdot p_r(r\mid s,a)$ 这一项可以看作"依照策略 $\pi$，在状态 $s$ 做动作得到的即时奖励的期望"，我们把它记为 $\mathbb{E}[R\mid s]$，其中 $R$ 是一个关于 $s,a,p_r$ 的随机变量。而 $\sum\limits_{a}\pi(a\mid s)\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot v_\pi(s')$ 这一项可以看作"依照策略 $\pi$，从状态 $s$ 转移得到的节点的状态值的期望"，我们把它记为 $\mathbb{E}[v_\pi(S')\mid s]$，其中 $S'$ 是一个关于 $s,a,p_\delta$ 的随机变量。这样，贝尔曼方程就可以写作：

$$
v_\pi(s)=\mathbb{E}[R+\gamma\cdot v_\pi(S')\mid s]
$$

这称为贝尔曼期望方程 (Bellman Expectation Equation)。经过这样的改写，我们就可以通过对随机变量 $R,S'$ 做采样，来代替期望的计算，从而也就不再要求 $p_\delta$ 是已知的。

我们用上一文中的 Robbins-Monro 算法来求解贝尔曼期望方程：令 $g(v(s))=v(s)-\mathbb{E}[R+\gamma\cdot v_\pi(S')\mid s]$，那么方程 $g(v(s))=0$ 的解 $v$ 就是状态值的准确值 $v_\pi$。根据 Robbins-Monro 算法，我们需要对所有 $s\in S$ 迭代 $v_{t+1}(s)=v_t(s)-a_t\tilde g(v_t(s))$。其中，为了采样 $\tilde g(v_t(s))$，需要在状态 $s$ 采样两个随机变量 $R ,S'$ 的值 $r,s'$：$\tilde g(v(s))=v(s)-(r+\gamma\cdot v_\pi(s'))$。这样得到的迭代式为：$v_{t+1}(s)=v_t(s)-a_t\cdot[v_t(s)-(r_t+\gamma\cdot v_\pi(s'_t))]$。但是这个迭代式右边出现了 $v_\pi$，而这是未知量，导致我们无法用这个式子做求解。于是，人们把右边的 $v_\pi$ 直接替换为了 $v_t$，得到了这样一个迭代式：

$$
v_{t+1}(s)=v_t(s)-a_t\cdot[v_t(s)-(r_t+\gamma\cdot v_t(s'_t))]
$$

对于每一时刻 $t$，我们都要对所有 $s\in S$ 采样 $r_t$ 和 $s_t'$，用上面这个式子计算 $v_{t+1}(s)$。由 Robbins-Monro 算法的收敛性分析可以证明：当 $\sum\limits_{t}a_t=\infty$，$\sum\limits_{t}a_t^2<\infty$ 时，$v_t(s)$ 将会以概率 $1$ 收敛到 $v_\pi(s)$。

> 在实际应用中，通常会取 $a_t$ 是一个小的常量。此时虽然 $\sum\limits_{t}a_t^2<\infty$ 不再满足，但是实验表明效果很好。

一个重要的观察是，我们实际上可以在机器做任务的过程中就完成上述更新。随意设定每个状态 $s$ 的初值 $v_0(s)$，接下来我们让机器从状态 $s_0$ 出发依照策略 $\pi$ 行动，于是我们得到了一列样本 $s_0,r_1,s_1,r_2,\cdots,r_{n},s_n$。对于 $s_0$ 而言，$r_1$ 和 $s_1$ 本身就构成了一次对"$R,S'$"的采样，所以此时已经能够完成 $v_1(s_0)$ 的更新。一般地，$r_{i+1},s_{i+1}$ 就能够完成 $v_k(s_i)$ 的更新，其中 $k$ 是 $s_i$ 已经被更新的次数。所以，我们可以按照本次行动经过的状态设定时刻，每次由 $s_t$ 转移到 $s_{t+1}$ 时，就做更新：

$$
v_{t+1}(s)=
\begin{cases}
  v_t(s_t)-a_t\cdot[v_t(s_t)-(r_{t+1}+\gamma\cdot v_t(s_{t+1}))]&,s=s_t\\
  v_t(s) & ,s\neq s_t
\end{cases}
$$

可见，这样的更新是在线的。只需要从足够多个初始状态出发，按照策略行动足够多次，就可以在行动的过程中自动完成所有状态的状态值的求解。

上面这个算法就称为时序差分方法，简称 TD-Learning。直观上，TD-Learning 在每一次修改 $v(s_t)$ 时，会减去一个"相邻时刻的差分项" $v_t(s_t)-(r_{t+1}+\gamma\cdot v_t(s_{t+1}))$，这个差分项随着 $t$ 的增大而减小，直到 $t\to \infty$ 时，因为 $v_t\to v_\pi$，所以 $v_\pi(s_t)-(r_{t+1}+\gamma\cdot v_\pi(s_{t+1}))=0$（期望意义下）。

> 通常会记：$\overline{v_t}:=r_{t+1}+\gamma\cdot v_t(s_{t+1})$，称为"TD-target"；记 $\delta_t:=v_t(s_t)-(r_{t+1}+\gamma\cdot v_t(s_{t+1}))$，称为"TD-error"。

和一般的蒙特卡罗方法相比，时序差分方法最大的优势在于：每一次更新只需要采样很少一组随机变量，因此它对状态值的估计的方差更小；并且，时序差分方法的采样可以立即完成，而蒙特卡罗方法必须等待采样完 $N$ 个样本之后才能做更新。

## SARSA

我们定义过动作值 $q_\pi(s,a)=\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  v_\pi(s')$，代表从状态 $s$ 出发做 $a$ 动作时总奖励的期望。那么贝尔曼方程可以写为 $v_\pi(s)=\sum\limits_{a}\pi(a\mid s)q_\pi(s,a)$，代入可得

$$
q_\pi(s,a)=\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  \sum\limits_{a}\pi(a\mid s)q_\pi(s',a)
$$

给定策略 $\pi$，我们将 $\sum\limits_{r}r\cdot p_r(r\mid s,a)$ 这一项记为 $\mathbb{E}[R\mid s,a]$，其中 $R$ 是一个关于 $s,a,p_r$ 的随机变量。而 $\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  \sum\limits_{a}\pi(a\mid s)q_\pi(s',a)$ 可以记为 $\mathbb{E}[q_\pi(S',A')\mid s,a]$，其中 $S',A'$ 是一个关于 $s,a,p_\delta$ 的随机变量。于是上述方程可以写作：

$$
q_\pi(s,a)=\mathbb{E}[R+\gamma\cdot q_\pi(S',A')\mid s,a]
$$

用与上一节完全相同的方法，我们可以给出下面这组计算 $q_\pi$ 的迭代式：

$$
q_{t+1}(s,a)=
\begin{cases}
  q_t(s_t,a_t)-a_t\cdot[q_t(s_t,a_t)-(r_{t+1}+\gamma\cdot q_t(s_{t+1},a_{t+1}))]&,(s,a)=(s_t,a_t)\\
  q_t(s,a) & ,(s,a)\neq (s_t,a_t)
\end{cases}
$$

由此可见，要更新 $q(s_t,a_t)$，我们需要用到的采样信息为 $r_{t+1},s_{t+1},a_{t+1}$。因为每一轮更新只涉及"$s_t,a_t,r_{t+1},s_{t+1},a_{t+1}$"，所以这个算法被称为 SARSA 算法。通过 SARSA 算法，我们可以在给定策略 $\pi$ 时计算出每对 $(s,a)$ 的动作值。

## Policy Searching using TD-Learning

上面的算法都是基于给定的策略 $\pi$ 求解状态值和动作值，和我们最初在贝尔曼方程一文中介绍的迭代方法相比，TD-Learning 是 model-free 的（不依赖于模型 $p_\delta$）。如果把上面的算法结合上我们在蒙特卡洛方法一文中得到的 model-free 的更新策略，我们就又得到了一个 model-free 的求解最优策略的算法：

初始时任意设定策略 $\pi_0$，从状态 $s_0$ 出发。对于任意时刻 $t$，设当前所处状态为 $s_t$，按照当前策略 $\pi_t$ 采样动作 $a_t$，即时奖励 $r_{t+1}$，状态转移目标 $s_{t+1}$，再次由 $\pi_t$ 采样得到动作 $a_{t+1}$。此时按照 SARSA 算法更新动作值 $q_{t+1}(s_t,a_t)$。基于更新后的动作值，用 $\varepsilon$-greedy 的方式更新策略 $\pi_{t+1}$，也即：

$$
\pi_{t+1}(a\mid s_t)=
\begin{cases}
  1-\dfrac{\varepsilon}{|\mathcal{A}|}(|\mathcal{A}|-1)&,a=\arg\max\limits_{a} q_{t+1}(s_t,a)\\
  \dfrac{\varepsilon}{|\mathcal{A}|} & ,\text{otherwise}
\end{cases}
$$

（采用 $\varepsilon$-greedy 的策略，可以增加采样的覆盖范围，提高效率。）

> 该算法通常也被称为 SARSA 算法。
>
> 有一种 SARSA 算法的变种，在更新 $q_{t+1}$ 时不需要采样 $a_{t+1}$，而把 $q_t(s_{t+1},a_{t+1})$ 这一项替换为了 $\sum\limits_{a}\pi_t(a\mid s_{t+1})q_t(s_{t+1},a))$。这个算法称为 Expected SARSA，它在实际中也有很好的效果。它减少了采样次数，因此变得更稳定。当然，它增大了计算的开销。
>
> 另一种 SARSA 算法的变种，在更新 $q_{t+1}$ 时会连续进行 $n$ 轮的采样。在 $t$ 时刻位于状态 $s_t$ 时，它通过采样 $s_t,a_t,r_{t+1},s_{t+1},a_{t+1},r_{t+1},\cdots,s_{t+n},a_{t+n}$，用 $q_{t+1}(s_{t+1},a_{t+1})=q_t(s_t,a_t)-a_t\cdot[q_t(s_t,a_t)-(r_{t+1}+\gamma \cdot r_{t+2}+\gamma^2\cdot r_{t+3}+\cdots+\gamma^n\cdot q_t(s_{t+n},a_{t+n}))]$ 做更新。这称为 $n$-step SARSA。这样，我们可以调整 $n$ 的取值，来改善算法的表现。当 $n=1$ 时，这就是普通的 SARSA 算法；当 $n$ 很大时，这就是蒙特卡洛算法。

## Q-Learning

到目前为止的 TD-Learning 算法，都是基于给定的策略 $\pi$，用 Robbins-Monro 算法求解贝尔曼方程。我们看到，通过把这样的算法和策略迭代结合起来，它就可以用来求解最优策略。

从另一方面看，如果可以用 Robbins-Monro 算法直接求解贝尔曼最优化方程，那么我们不需要做策略迭代。因为我们已经证明了，假设我们已经求出各个"状态-动作对"上的动作值，那么取动作值最大的状态做转移就是最优策略。

我们证明，只要把 SARSA 算法的更新修改为下面的形式，就可以求出贝尔曼最优化方程的解 $q$。这个算法称为 Q-Learning：

$$
q_{t+1}(s,a)=
\begin{cases}
  q_t(s_t,a_t)-a_t\cdot[q_t(s_t,a_t)-(r_{t+1}+\gamma\cdot \max\limits_{a}q_t(s_{t+1},a))]&,(s,a)=(s_t,a_t)\\
  q_t(s,a) & ,(s,a)\neq (s_t,a_t)
\end{cases}
$$

类比之前几节的论证，这一更新可以看作是在求解方程

$$
q(s,a)=\mathbb{E}[R+\gamma\cdot \max\limits_{a} q(S',a)\mid s,a]
$$

也即

$$
q(s,a)=\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  \max\limits_{a_0}q(s',a_0)
$$

如果 $q$ 满足该方程，那么一定满足下面这个在两边同时关于 $a$ 取 $\max$ 的方程

$$
\max\limits_{a}q(s,a)=\max\limits_{a}\left[\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  \max\limits_{a_0}q(s',a_0)\right]
$$

令 $v(s)=\max\limits_{a}q(s,a)$，那么得到

$$
v(s)=\max\limits_{a}\left[\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  v(s')\right]
$$

我们证明过这等价于

$$
v(s)=\max\limits_{\pi}\sum\limits_{a}\pi(a\mid s)\left[\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  v(s')\right]
$$

而这就是贝尔曼最优化方程。可见，Q-Learning 算法解出了贝尔曼最优化方程中的动作值。于是，只需要在每个状态取动作值的最大值，就能得到最优策略。

注意，$q_{t+1}(s_{t+1},a_{t+1})=q_t(s_t,a_t)-a_t\cdot[q_t(s_t,a_t)-(r_{t+1}+\gamma\cdot \max\limits_{a}q_t(s_{t+1},a))]$ 这一步迭代中，只需从 $s_t,a_t$ 出发采样 $r_{t+1},s_{t+1}$，不用采样 $a_{t+1}$。这意味着，Q-Learning 的更新是不依赖于策略迭代的，也即不需要有一个已经求出的 $\pi_{t}$，依据 $\pi_t$ 来采样 $a_{t+1}$。在 Q-Learning 中，我们可以依据一个任意的策略 $\pi_0$ 采样一列 $s_0,a_0,r_1,\cdots$，然后利用这一列数据更新策略。这样的策略更新方法称为 off-policy，传统的依赖于策略的迭代的更新方法称为 on-policy。Off-policy 是 Q-Learning 相对于传统 TD-Learning 的一个巨大优势，它使得"用来采样的策略"和"想要最优化的策略"是相对独立的，前者称为 behavior policy，后者称为 target policy。Behavior policy 不依赖于 target policy，意味着我们可以用现存的人类数据代替采样，这样的做法称为 experience replay，可以更高效地求解最优策略。

## Value Function Approximation

到目前为止我们所介绍的强化学习算法中，我们总是需要对每个状态 $s\in S$ 计算状态值或动作值，从而才能找到最优策略。这样的方法对于"走迷宫"这样的状态不多且有限的场景是有效的。然而，在许多场景中，状态的总数远超计算机的存储能力，我们几乎可以认为状态数是无限的。比如，想象"2048游戏"，尽管只有 16 个格子，但每个格子上的数字可能有 $12$ 种，因此这意味着总状态数达到 $12^{16}$。甚至会有状态是连续分布的场景。在这些场景中，计算每个状态的状态值或动作值就变得不现实了。

### State Value Estimation

一个解决方案是，用"拟合"的方式计算状态值或动作值。这是一个传统的机器学习问题，下面以计算状态值为例。给定策略 $\pi$，$\forall s\in \mathcal{S}$，状态值的准确值为 $v_\pi(s)$。我们定义一个函数 $\hat v(s,w)$ 作为对 $v_\pi(s)$ 的估计，其中 $w$ 是待训练参数。用 $\hat v$ 拟合 $v$，也即训练得到参数 $w$，就是最小化损失函数 $J(w)$。假设总状态数是有限的，那么可以用传统的最小二乘法作为损失函数，也即

$$
J(w)=\dfrac{1}{|\mathcal{S}|}\sum\limits_{s\in \mathcal{S}}^{}(v_\pi(s)-\hat v(s,w))^2
$$

在强化学习中，对于马尔可夫决策过程，一个更常用的损失函数是上面这个函数的加权形式：

$$
J(w)=\sum\limits_{s\in \mathcal{S}}d_\pi(s)\cdot(v_\pi(s)-\hat v(s,w))^2
$$

其中，$d_\pi$ 是该马尔可夫决策过程的稳态分布，满足 $P_\pi^\top d_\pi=d_\pi$。其中，$P_\pi(i,j)$ 就是我们在贝尔曼方程一文中定义过的"从状态 $s_i$ 转移到 $s_j$ 的概率"。从数学上看，$d_\pi$ 是矩阵 $P_\pi^\top$ 关于特征值 $1$ 的一个特征向量。取稳态分布作为损失函数的权重有一个很自然的原因：稳态分布反映出该决策过程进行经过足够次以后每个状态被访问的频率，我们希望频率越高的状态上 $\hat v$ 估计的误差更小。

无论是最小二乘法还是稳态分布，损失函数都可以看作是一个状态集 $\mathcal{S}$ 上的随机变量 $S$ 满足某一分布时，下面这个表达式的期望：

$$
J(w)=\mathbb{E}[(v_\pi(S)-\hat v(S,w))^2]
$$

定义了损失函数以后，"求解（实际上是拟合）"状态值函数的任务就转化为了最小化损失函数 $J(w)$。这可以转化为求方程 $\nabla _w J(w)=0$。注意，$J(w)$ 表达式中的 $v_\pi$ 是未知的，所以这个方程也必须用 Robbins-Monro 算法来求解：$w_{k+1}=w_k-a_k\tilde g(w_k)$，其中 $\tilde g(w_k)$ 是对 $\nabla_w J(w_k)$ 的近似。我们做计算：$\nabla_w J(w)=\mathbb{E}[\nabla_w(v_\pi(S)-\hat v(S,w))^2]=-2\cdot \mathbb{E}[(v_\pi(S)-\hat v(S,w))\nabla_w\hat v(S,w)]$。因为 $\hat v$ 的模型是已知的，随机变量 $S$ 可以通过一次采样 $s_t$ 得到，所以唯一困难之处在于估计 $v_\pi(s_t)$。显然，我们不能用 $\hat v(s_t,w_t)$ 来估计，不然迭代项会被减为 $0$。一个常用的方法是用"TD-target" $r_{t+1}+\gamma \cdot\hat  v(s_{t+1},w_t)$ 来估计 $v_\pi(s_t)$，这样得到迭代式：

$$
w_{k+1}=w_k+a_k\left[r_{t+1}+\gamma\cdot \hat v(s_{t+1},w_t)-\hat v(s_{t},w_t)\right]\nabla_w \hat v(s_t,w_t)
$$

在实践中我们通常用这一迭代式来计算 $\hat v$。虽然可以证明，从数学上这一迭代式并不收敛到 $J(w)=\mathbb{E}[(v_\pi(S)-\hat v(S,w))^2]$ 的极小值点。

### Action Value Estimation

和状态值函数的拟合完全类似，给定策略 $\pi$，如果要拟合动作值，也就是要最小化函数

$$
J(w)=\mathbb{E}[(q_\pi(S,A)-\hat q(S,A,w))^2]
$$

可以用下面这个迭代式求解：

$$
w_{k+1}=w_k+a_k\left[r_{t+1}+\gamma\cdot \hat q(s_{t+1},a_{t+1},w_t)-\hat q(s_{t},a_t,w_t)\right]\nabla_w \hat q(s_t,a_t,w_t)
$$

给定策略 $\pi_0$，根据拟合得到的 $\hat q$，在每个状态选择 $\hat q$ 的最大值，就可以得到一个新策略 $\pi_1$。重复此过程，就能求出值函数近似下的最优策略。这一算法就是值函数近似下的 SARSA 算法。

同理，也有值函数近似下的 Q-Learning 算法就是要最小化函数

$$
J(w)=\mathbb{E}[(R+\gamma\cdot \max\limits_{a} \hat q(S',a,w)-\hat q(S,A,w))^2]
$$

可以用下面这个迭代式求解：

$$
w_{k+1}=w_k+a_k\left[r_{t+1}+\gamma\cdot \max\limits_{a}\hat q(s_{t+1},a,w_t)-\hat q(s_{t},a_t,w_t)\right]\nabla_w \hat q(s_t,a_t,w_t)
$$

### Deep Q-Learning

在值函数近似中，很关键的一个问题是：应该怎样设计 $\hat v$（或 $\hat q$）的模型呢？近些年，最常用的做法就是用神经网络作为 $\hat v$（或 $\hat q$）的模型。理论上，神经网络具有近似一切非线性函数的能力。把神经网络作为 $\hat q$ 的模型的值函数近似下的 Q-Learning 算法，就称为 Deep Q-Learning，也称为"Deep Q-Network"，简称 DQN。

原则上，选定合适的神经网络作为 $\hat q$ 的模型，上一节的迭代式 $w_{k+1}=w_k+a_k\left[r_{t+1}+\gamma\cdot \max\limits_{a}\hat q(s_{t+1},a,w_t)-\hat q(s_{t},a_t,w_t)\right]\nabla_w \hat q(s_t,a_t,w_t)$ 就已经给出了一个 DQN 算法。然而这样的做法在实践中并不常见，原因是要上述迭代式并不是一个传统的梯度下降的迭代式。要使用该式，我们必须深入到神经网络的底层结构上做计算和更新。而实践中，神经网络模型通常是以黑盒的形式存在的，在做强化学习时我们通常不希望深入到模型的底层架构中去。基于这些理由，产生了下面这样的 DQN 的改进算法。

引入两个神经网络 $\hat q(s,a,w)$ 和 $\hat q(s,a,w_T)$，前者称为 main network，后者称为 target network。把损失函数改写为：

$$
J(w,w_T)=\mathbb{E}[(R+\gamma\cdot \max\limits_{a} \hat q(S',a,w_T)-\hat q(S,A,w))^2]
$$

在训练时，我们暂时固定 target 不做更新，只关于 $w$ 做更新。在这一步更新中，设已经采样得到 $s,a,r,s'$，此时要最小化关于 $w$ 的函数 $(r+\gamma\cdot \max\limits_{a_0} \hat q(s',a_0,w_T)-\hat q(s,a,w))^2$，只需调用传统的梯度下降算法。在梯度下降进行若干步以后，我们把更新后的 $w$ 赋值给 $w_T$。重复上述过程。实践证明，这样的 DQN 算法有非常好的效果。

## 参考资料

[1] 赵世钰 《强化学习的数学原理》