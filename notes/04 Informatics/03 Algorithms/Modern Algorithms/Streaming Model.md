## Streaming Model

$\newcommand{\E}{\mathbb{E}}$$\newcommand{\Var}{\text{Var}}$假设我们会依次接收到一个正整数序列$a_1,a_2,\cdots$，保证序列长度不超过$m$。但我们只有有限的内存位来存放它们，序列的长度可能会远大于内存的大小。一个简单的问题是，最少需要几位内存bit才能回答“实际输入的序列长度$n$是多少”这个问题呢？一个简单直接的方法就是把内存当作一个二进制计数器来用，每接收到一个数据就增加$1$。这样$\lceil \log_2 m\rceil$位内存就已经足够了。

能不能设计一个更好的算法呢？对于确定性的算法，这是不可能的：由于确定性的算法在接收完每个输入数据流后都会在内存上留下一个确定的状态。设内存大小为$M$，那么不同的状态个数最多只有$2^M$个。假设$M<\lceil \log_2 m\rceil$，那么$2^M<m$，可见势必有两个不同长度的输入数据流最后会对应同样的内存状态，所以这显然不是一个正确的算法。

$\newcommand{\ep}{\varepsilon}$尽管不存在一个更好的确定性算法，但在许多应用场景下，我们并不要求知道输入数据流的精确长度，而是只需要给出一个对数据流长度的一个估计。如果允许输出包含一点小的误差，会不会能节省大量的空间呢？换言之，我们希望能找到一个算法给出一个数据流长度的估计$\hat n$，并且所需的内存大小尽量小。这是concentration的第一个例子，我们希望算法的近似输出能“concentrate”在标准输出附近。

### Morris' Algorithm

我们考虑采用带有随机性的算法。一个构造巧妙的算法(Morris' algorithm)是这样做的：初始时令$X=0$，每接收到一个输入$a_i$时，以$2^{-X}$的概率令$X$增加$1$，$1-2^{-X}$的概率令$X$保持不变，输出$\hat n=2^X-1$。因为$X$是$O(\log m)$级别的，所以储存$X$只需要$O(\log\log m)$的内存，大大优化了内存空间。

我们能证明，这个算法在期望意义下是准确的，也即$\E[ \hat n] = n$。考虑对输入数据流的长度$n$归纳，当$n=1$时，$X$以$2^0=1$的概率增加$1$，所以输出一定为$2^1-1=1$，满足；假设输入流长度$<n$时成立，对于长度为$n$的输入，令随机变量$X_i$表示输入第$i$个数以后$X$的值，那么$\E[\hat n] = \E[2^{X_n}]-1$，由全概率公式$\E[2^{X_n}]=\sum\limits_{x=0}^{n}\Pr[X_n=x]\cdot 2^x$。根据算法，$\Pr[X_n=x]=(1-2^{-x})\Pr[X_{n-1}=x]+2^{-(x-1)}\Pr[X_{n-1}=x-1]$，带入可得$\E[2^{X_n}]=\sum\limits_{x=0}^n2^x\left[(1-2^{-x})\Pr[X_{n-1}=x]+2^{-(x-1)}\Pr[X_{n-1}=x-1]\right]$$=\sum\limits_{x=0}^n\left(2^x\Pr[X_{n-1}=x]-\Pr[X_{n-1}=x]+2\Pr[X_{n-1}=x-1]\right)$$=\sum\limits_{x=0}^{n-1}2^x\Pr[X_{n-1}=x]-\sum\limits_{x=0}^{n-1}\Pr[X_{n-1}=x]+2\sum\limits_{x=0}^{n}\Pr[X_{n-1}=x-1]$$=\E[2^{X_{n-1}}]+1$，由归纳假设得$\E[2^{X_n}]=n+1$，也即$\E[\hat n]=n$，证毕。

以上分析说明，Morris算法满足了最基本的concentration要求：算法估计在期望意义下准确，也即算法的输出的分布的中心点和标准答案重合。期望意义下准确并不代表输出以很高的概率集中在期望附近，相反假设输出在期望两侧很远的位置以对称的概率分布，也可能导致期望准确。换言之，我们能不能给出更高阶moment（期望是一阶moment）的concentration的要求：算法估计以很高概率分布在期望附近？

利用Concentration不等式，我们可以对Morris算法给出的估计进行更精确的分析。根据Chebyshev不等式，$\Pr[|\hat n-n|\geq \ep]\leq \dfrac{\Var(\hat n)} {\ep^2}$。其中$\Var(\hat n)=\E[(\hat n-n)^2]$$=\E[\hat n^2]-n^2$。而$\E[\hat n^2]=\E[(2^{X_n}-1)^2]$$=\E[(2^{X_n})^2]-2\E[2^{X_n}]+1$$=\E[(2^{X_n})^2]-2(n+1)+1$。所以只需求解$\E[(2^{X_n})^2]$。

我们发现$\E[(2^{X_n})^2]=\dfrac{3}{2}n^2+\dfrac{3}{2}n+1$。归纳法，当$n=1$时$X_1=1$，$\E[2^2]=4=\dfrac{3}{2}+\dfrac 3 2+1$，成立；假设$<n$时已经成立，由全概率公式$\E[(2^{X_n})^2]=\sum\limits_{x=0}^{n}\Pr[X_n=x]\cdot 2^{2x}$。再一次，$\Pr[X_n=x]=(1-2^{-x})\Pr[X_{n-1}=x]+2^{-(x-1)}\Pr[X_{n-1}=x-1]$，代入得$\E[(2^{X_n})^2]=\sum\limits_{x=0}^n2^{2x}\left[(1-2^{-x})\Pr[X_{n-1}=x]+2^{-(x-1)}\Pr[X_{n-1}=x-1]\right]$$=\sum\limits_{x=0}^n\left((2^{2x}-2^x)\Pr[X_{n-1}=x]+2^{x+1}\Pr[X_{n-1}=x-1]\right)$$=\sum\limits_{x=0}^{n-1}(2^{2x}-2^x)\Pr[X_{n-1}=x]+\sum\limits_{x=0}^{n-1}2^{x+2}\Pr[X_{n-1}=x]$$=\sum\limits_{x=0}^{n-1}(2^{2x}+3\cdot 2^x)\Pr[X_{n-1}=x]$，由归纳假设和一阶的结论得到$=\E[(2^{X_{n-1}})^2]+3\E[2^{X_{n-1}}]$$=\dfrac{3}{2}(n-1)^2+\dfrac{3}{2}(n-1)+1+3n=\dfrac{3}{2}n^2+\dfrac{3}{2}n+1$。

综上，$\Var (\hat n)=\dfrac{3}{2}n^2+\dfrac{3}{2}n+1-2(n+1)+1-n^2$$=\dfrac{1}{2}n^2-\dfrac{1}{2}n\leq \dfrac{n^2}{2}$。代入Chebyshev不等式，取$a=\ep n$，则$\Pr[|\hat n-n|\geq \ep n]\leq\dfrac{1}{2\ep^2}$。然而这还不是一个非常好的Concentration，因为当$\ep \to 0$时$\dfrac{1}{2\ep^2}\to \infty$。为了避免这个问题，我们可以对算法做一点修改，从而获得更好的Concentration。

### The Averaging Trick

Chebyshev不等式是用方差来做估计的。我们从小就知道，减小方差的基本方法就是“多次测量取平均”。于是我们可以独立重复运行$k$次Morris算法，对每次得到的结果$\hat n_i$取平均，输出$\hat n^\ast=\dfrac{\sum\limits_{i=1}^{k}\hat n_i}{k}$。那么$\Pr[|\hat n^\ast-n|\geq \ep n]\leq\dfrac{\Var(\hat n^\ast)}{\ep^2n^2}$$=\dfrac{\sum\limits_{i=1}^{k}\Var (\hat n_i)}{\ep^2n^2k^2}\leq\dfrac{\sum\limits_{i=1}^{k}\frac{1}{2}n^2}{\ep^2k^2n^2}$$=\dfrac{1}{2\ep^2k}$。那么取$k\geq \dfrac{1}{2\ep^2\delta}$，就有$\Pr[|\hat n^\ast-n|\geq \ep n]\leq \delta$。

这个多次求值取平均的技巧称为The Averaging Trick。通过以上分析可知，此时$\Pr[|\hat n^\ast -n|\geq \ep n]$能被常数bound住，是一个好的Concentration。新算法的内存占用情况如何呢？由于每次都需要保存在之前的结果，如果我们并行地为每一次都分配新的内存，那么需要的内存就是$O(k\cdot \log\log n)$。能否每一次把前一次的结果存下来然后利用重复的空间呢？如果那样，那么我们需要保存$2^X$的值，那么需要一块大小为$\log n$的内存，还不如并行。所以最优的内存分配方案就是$O(k\cdot \log\log n)$，当$k\geq \dfrac{1}{2\ep^2\delta}$时，内存为$O(\dfrac{\log\log n}{\ep^2\delta})$。

### The Median Trick

和“多次测量取平均”类似，我们还可以“多次测量取中位数”来减少误差。在上面取平均的例子中，我们需要重复$O(\dfrac{1}{\ep^2\delta})$次才能用一个任意小的常数$\delta$来bound。为了说明取中位数的方法，我们首先采用The Averaging Trick用一个常数$\delta=\dfrac{1}{3}$来bound（重复$k=\dfrac{3}{2\ep^2}$取平均），也即$\Pr[|\hat n^\ast -n|\geq \ep n]\leq\dfrac{1}{3}$。重复以上过程$s$次，得到$s$个估计$\hat n_1^\ast,\cdots,\hat n_s^\ast$。取这$s$个数的中位数作为输出$\hat n^{\ast\ast}$。

我们来分析$\Pr[|\hat n^{\ast\ast}-n|\geq \ep n]$。中位数落在区间$[n-\ep n,n+\ep n]$外这一事件发生能推出至少有一半的$\hat n_i^\ast$落在了区间外。 定义$Y_i=\mathbb{1}[|\hat n_i^\ast - n|\geq \ep n]$，$Y=\sum\limits_{i=1}^{s}Y_i$，那么$\Pr[|\hat n^{\ast\ast}-n|\geq \ep n]\leq \Pr[Y\geq s/2]$。现在$Y_i$以概率$p=\Pr[|\hat n^\ast -n|\geq \ep n]\leq\dfrac{1}{3}$满足伯努利分布，根据Chernoff Bound，$\Pr[Y\geq (1+\delta)\mu]\leq e^{-\frac{1}{3}\delta^2\mu}$。现在$\mu = p\cdot s\leq \dfrac{s}{3}$，所以取$\delta = \dfrac{1}{2}$可得$\Pr[Y\geq s/2]\leq \Pr[Y\geq \dfrac{3}{2}\mu]\leq e^{-\frac{\mu}{12}}\leq e^{-\frac{s}{36}}$。

综上，$\Pr[|\hat n^{\ast\ast}-n|\geq \ep n]\leq e^{-\frac{s}{36}}$。取$s=O(\log \dfrac{1}{\delta})$，可得$\Pr[|\hat n^{\ast\ast}-n|\geq \ep n]\leq \delta$。我们同样为这$s$次计算单独分配新内存，那么总内存为$O(s\cdot k\cdot \log\log n)$$=O(\dfrac{1}{\ep^2}\cdot \log \dfrac{1}{\delta}\cdot \log \log n)$，在相同Concentration的情况下我们把$\dfrac{1}{\delta}$优化为了$\log \dfrac{1}{\delta}$。
