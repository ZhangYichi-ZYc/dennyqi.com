强化学习的目标是要让机器自动地找出一个决策过程里每一步的“最优”决策。例如，在一个$n\times n$的网格图中，有一个机器人站在左上角的方框内，它可以上下左右移动或原地不动，它的目标是要到达右下角的方框内，但是其运动过程中要尽量避免那些被标记为“障碍”的格子。这样一个任务就是一个“决策过程”的任务，强化学习的目标就是让机器人找出每一步应当如何移动的“最优策略”。

## Markov Decision Process

我们为决策过程建立一个数学模型。首先，我们有$n$个状态(state) $s_i$，它们构成状态集合$S$（网格）；在每个状态上有$m$个可能的动作(action) $a_j$（上下左右的移动）；在状态$s_i$采取动作$a_j$会使状态转移到$\delta(s_i,a_j)$，这是状态转移函数。状态转移函数可能是确定性的，也有可能是不确定性的。对于不确定性的状态转移函数，我们用概率来描述，$p(s_j\mid s_i,a_j)$表示“位于状态$s_i$时采取动作$a_j$会转移到状态$s_j$的概率”。机器的任务是要在每个状态做出关于动作的决策(policy)，这个决策也可能是不确定性的，此时我们也用概率来描述，$\pi(a_j\mid s_i)$表示在状态$s_i$做出$a_j$决策的概率。

在上面这个模型中，决策仅取决于当前所处的状态，而与状态的历史信息无关，所以把这样的决策过程称为“马尔可夫决策过程(Markov Decision Process)”。

在强化学习中，最重要的是如何来评估机器所作出的决策，从而来优化机器的决策行为。我们引入一个称为“奖励”的函数：假设第$t$步决策时，机器位于$s_i$，做出决策$a_j$时，此时我们赋予这个决策一个实数$R_t$，称为第$t$步的即时奖励(immediate reward)，简称奖励。奖励也可以是概率的，这时需要描述第$t$步在$s_i$做出决策$a_j$时奖励为$R_t$的概率$p_r(R_t\mid s_i,a_j)$。我们可以用从初始到结束的所有奖励之和的累加$R_1+R_2+\cdots+R_t$来做评估，我们把这个值称为决策的总奖励或返回值(return)。我们也可以对返回值做一些调整，例如设定一个$0<\gamma<1$的实数$\gamma$，把$R_1+\gamma R_2+\cdots +\gamma^{t-1}R_t$作为返回值，这样我们就可以控制机器的决策是更“长远”的还是更“短视”的（这个$\gamma$称为discounted rate）。

值得注意的是，如果决策或奖励是非确定性的，那么决策的返回值是一个随机变量而不是一个确定的值。这时，我们可以用返回值的期望来评估决策过程，这个期望就称为状态值(state value)。状态值是一个关于初始状态的函数（当然也是关于决策$\pi$的），我们可以把初始状态为$s_0$的状态值记为$v_\pi(s_0)$。

## Bellman Equation

根据马尔可夫过程是没有记忆的(memory-less)，计算从状态$s$出发的状态值$v_\pi (s)$，只需要递归地计算从$s$转移出去的所有状态$s'$的状态值$v_\pi(s')$，但是这种“递归”不是一种DAG形式的递归，状态的转移是可以成环的。这意味着，状态值的计算并不简单。但是，因为$v_\pi(s)$和$v_\pi(s')$之间的关系是线性的，因此总可以用线性方程组的形式来求解。

例如，当我们采用discounted rate来计算状态值时，对于从状态$s$出发的状态值$v_\pi (s)$，那么我们可以根据定义展开，得到$v_\pi (s)=\sum\limits_{a}\sum\limits_{s'}\pi(a\mid s)p_\delta(s'\mid s,a)\cdot \left[\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot v_\pi(s')\right]$。化简可得

$$
v_\pi (s)=\sum\limits_{a}\pi(a\mid s)\left[\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \sum\limits_{s'}p_\delta(s'\mid s,a)\cdot v_\pi(s')\right]
$$

这就是贝尔曼方程(Bellman Equation)。如果令$r_\pi(s):=\sum\limits_{a}\pi(a\mid s)\sum\limits_{r}r\cdot p_r(r\mid s,a)$，$p_\pi(s'\mid s):=\sum\limits_{a}\pi(a\mid s)p_\delta(s'\mid s,a)$，那么就有$v_\pi(s)=r_\pi(s)+\gamma \sum\limits_{s'}p_\pi(s'\mid s,a)\cdot v_\pi(s')$。这个关系对于任意$s$都成立，因此可以写出线性方程组：

$$
\begin{bmatrix}v_\pi(s_1)\\\vdots \\ \ v_\pi(s_n)\end{bmatrix}=\begin{bmatrix}r_\pi(s_1)\\\vdots \\ \ r_\pi(s_n)\end{bmatrix}+\gamma \begin{bmatrix}P_\pi(s_1\mid s_1)& \cdots & P_\pi(s_n\mid s_1)\\\vdots & \ddots & \vdots \\ \ P_\pi(s_1\mid s_n) & \cdots & P_\pi(s_n\mid s_n)\end{bmatrix}\begin{bmatrix}v_\pi(s_1)\\\vdots \\ \ v_\pi(s_n)\end{bmatrix}
$$

用字母表示矩阵，就得到
$$
v_\pi = r_\pi+\gamma P_\pi v_\pi
$$
其中$P_\pi$就可以看作状态转移图的邻接矩阵，$P_\pi(i,j)$表示从状态$s_i$出发，决策$\pi$将会有$P_\pi(i,j)$的概率将状态转移到$s_j$。这样，我们就得到了状态值的计算公式：
$$
v_\pi = (I-\gamma P_\pi)^{-1}r_\pi
$$
由于矩阵求逆的开销可能较大，常见的代替方法是做迭代：$v_\pi^{(k+1)} = r_\pi+\gamma P_\pi v_\pi^{(k)}$，其中$v_\pi^{(0)}$可以是任取的一个向量，可以证明$v_\pi^{(k)}$在这样的迭代下是收敛的。

## Bellman Optimality Equation

根据贝尔曼方程，我们可以在马尔可夫决策过程给定决策时计算状态值。而在强化学习中，重要的问题是如何找出一个好的决策。

我们可以这样比较两个决策。对于决策$\pi_1$和决策$\pi_2$，如果在任意一个状态$s$上都有$v_{\pi_1}(s)\geq v_{\pi_2}(s)$，就称$\pi_1$比$\pi_2$更优。假如我们希望找到一个“最优”的决策，那么就是希望找到一个决策$\pi^*$满足：对于任意决策$\pi$，都有$\pi^*$比$\pi$更优。

贝尔曼方程告诉我们，当决策$\pi$给定时，$s$上的状态值必须满足方程$v_\pi (s)=\sum\limits_{a}\pi(a\mid s)\left[\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \sum\limits_{s'}p_\delta(s'\mid s,a)\cdot v_\pi(s')\right]$。我们把右边括号里这一项记为$q_\pi(s,a)=\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  v_\pi(s')$，在给定$s,a$时，这一项是关于决策$\pi$的。可以看到，$q_\pi$表示从状态$s$做出$a$动作所产生的返回值的期望。于是，贝尔曼方程可以写作$v_\pi(s)=\sum\limits_{a}\pi(a\mid s)q_\pi(s,a)$。

贝尔曼最优化方程为我们提供了一个求解最优决策的方法。它说我们只需要解下面这个方程，就能得出最优决策下的状态值函数$v(s)$：
$$
v(s)=\max\limits_{\pi}\sum\limits_{a}\pi(a\mid s)\left[\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  v(s')\right]
$$
我们把上面这个公式用矩阵的形式写出来
$$
v=\max\limits_{\pi}\left(r_\pi+\gamma P_\pi v\right)
$$
令$f(v)=\max\limits_{\pi}(r_\pi+\gamma P_\pi v)$，那么这个方程就是要求解函数$f(v)$的不动点。可以证明，$f$是一个压缩映射，也即存在$\eta\in (0,1)$使得$\forall x_1,x_2,$$\|f(x_1)-f(x_2)\|\leq \eta \|x_1-x_2\|$。压缩映射定理告诉我们，压缩映射的不动点存在且唯一，并且恰好等于数列$x_{k+1}=f(x_k)$的极限，且数列$x_k$是指数收敛的。这就为我们提供了迭代求解最优决策的方法：$v_{k+1}=\max\limits_{\pi}\left(r_\pi+\gamma P_\pi v_k\right)$。

> 已知$v_k$时，如何计算$\max\limits_{\pi}\left(r_\pi+\gamma P_\pi v_k\right)$呢？对于状态$s$，我们要求$\max\limits_{\pi}\sum\limits_{a}\pi(a\mid s)\left[\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  v_k(s')\right]$。而当$v_k$固定时，$\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  v_k(s')$是与$\pi$无关的量。因此，最优的$\pi$就是$\pi(a\mid s):=$$\mathbb{1}\left[a=\arg\max\limits_{a_0}\left[  \sum\limits_{r}r\cdot p_r(r\mid s,a_0)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a_0)\cdot  v_k(s')\right]\right]$。可见，不需要任何最优化技巧，只需代入每种动作做计算，就可以得到$\max\limits_{\pi}\left(r_\pi+\gamma P_\pi v_k\right)$。

我们来验证贝尔曼最优化方程的解$v^*$的确是最优决策的状态值，也即验证对于任意$\pi$都有$v^*\geq v_\pi$。因为$v^*$满足$v^*=\max\limits_{\pi}\left(r_\pi+\gamma P_\pi v^*\right)$，因此对于任意$\pi$都有$v^*\geq r_\pi+\gamma P_\pi v^*$。所以对于任意$\pi$，有$v^*-v_\pi\geq r_\pi+\gamma P_\pi v^*-r_\pi-\gamma P_\pi v_\pi=\gamma P_\pi(v^*-v_\pi)$。重复使用这个公式，得到$v^*-v_\pi \geq \gamma P_\pi(\gamma P_\pi(v^*-v_\pi))$。由此可得$\forall n\in \N$，$v^*-v_\pi \geq \gamma^nP_\pi^n(v^*-v_\pi)$。令$n\to \infty$，有$v^*-v_\pi \geq 0$。因此$v^*$的确是最优决策的状态值。

接下来验证，决策$\pi^*(a\mid s):=\mathbb{1}\left[a=\arg\max\limits_{a_0}\left[  \sum\limits_{r}r\cdot p_r(r\mid s,a_0)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a_0)\cdot  v^*(s')\right]\right]$就是最优决策，且满足$\pi^*=\arg\max\limits_{\pi}(r_\pi+\gamma P_\pi v^*)$。因为$v^*$是贝尔曼最优化方程的解，所以$v^*(s)=\max\limits_{\pi}\sum\limits_{a}\pi(a\mid s)\left[\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  v^*(s')\right]$，因为$\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  v^*(s')$是一个与$\pi$无关的量，所以使得期望最大的概率分布就是$\pi^*$，也即$v^*(s)=\sum\limits_{a}\pi^*(a\mid s)\left[\sum\limits_{r}r\cdot p_r(r\mid s,a)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a)\cdot  v^*(s')\right]$。这恰好是贝尔曼方程，说明$\pi^*$恰好是$v^*$对应的一组决策。

这个简洁的结果说明，最优决策总是一个确定性的决策，它总会选择使得$\sum\limits_{r}r\cdot p_r(r\mid s,a_0)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a_0)\cdot  v(s')$最大的那个动作，也就是使得$q_\pi(s,a)$最大的那个动作。所以我们把$q_\pi(s,a)$称为“动作值(action value)”。用动作值来表示，贝尔曼最优化方程就写为$v(s)=\max\limits_{\pi}\sum\limits_{a}\pi(a\mid s)q_\pi(s,a)$。当决策接近最优决策时，可以用动作值来衡量动作的价值。

综上所述，在给定决策模型$p$、奖励函数$p_r$以及系数$\gamma$时，可以通过迭代$v_{k+1}=\max\limits_{\pi}\left(r_\pi+\gamma P_\pi v_k\right)$解出最优决策状态值$v^*$，由$v^*$计算最大的动作值就得到最优决策$\pi^*$。所以，要求出模型$p$上的好的决策，人只需对$p_r$和$\gamma$做调参，找到最好的$v^*$，然后使用其对应的决策即可。

## Value Iteration & Policy Iteration

上面的求解最优策略的过程，是初始时任选一个$v_0$，由$v_0$我们计算出一个策略$\pi_0(a\mid s):=\mathbb{1}\left[a=\arg\max\limits_{a_0}\left[  \sum\limits_{r}r\cdot p_r(r\mid s,a_0)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a_0)\cdot  v_0(s')\right]\right]$，然后就有$v_1=r_{\pi_0}+\gamma P_{\pi_0}v_0$，依次类推，$v_k$会收敛到$v^*$。这个过程称为值迭代(value iteration)，它的每一步迭代可以看作两步：首先由上一步的状态值$v_k$计算得到一个最大化动作值的策略$\pi_k$，由这个策略再生成下一步的状态值$v_{k+1}$。

显然，如果初始时给定的是一个初始策略，我们也可以做迭代。因为从数学上，我们只需要交换一下上面两步的顺序。但是，在给定初始策略$\pi_0$时，由于我们还没有计算得到任何状态值，所以我们必须用贝尔曼方程来求解$v_0$：$v_0=r_{\pi_0}+\gamma P_{\pi_0}v_0$。而我们提到过，大多数时候矩阵求逆是效率低下的，所以求解贝尔曼方程本身也需要迭代：$v^{(k+1)}_0=r_{\pi_0}+\gamma P_{\pi_0}v^{(k)}_0$。得到$v_0$的精确值以后，再计算下一次迭代的策略$\pi_1(a\mid s):=\mathbb{1}\left[a=\arg\max\limits_{a_0}\left[  \sum\limits_{r}r\cdot p_r(r\mid s,a_0)+\gamma \cdot\sum\limits_{s'}p_\delta(s'\mid s,a_0)\cdot  v_0(s')\right]\right]$。这个方法称为策略迭代(policy iteration)。策略迭代的每一步迭代都需要用迭代的方法计算状态值。但是实践中，我们无法迭代无穷步得到精确的状态值，所以我们只能在解贝尔曼方程的迭代进行有限步之后截断。所以事件中的策略迭代其实是截断策略迭代(truncated policy iteration)。

既然已经有了能够精确计算的值迭代，为什么我们还要讨论策略迭代呢？我们发现，策略迭代在每一步迭代地用$v^{(j+1)}_k=r_{\pi_j}+\gamma P_{\pi_0}v^{(j)}_k$解贝尔曼方程的时候，所作的计算和值迭代中的$v_{j+1}=r_{\pi_0}+\gamma P_{\pi_0}v_j$所作的计算是相同的，但是策略迭代会进行多轮这样的计算。可以证明，策略迭代的收敛速度是高于值迭代的。截断策略迭代的收敛速度介于值迭代与策略迭代之间。

## 参考资料

[1] 赵世钰 《强化学习的数学原理》









