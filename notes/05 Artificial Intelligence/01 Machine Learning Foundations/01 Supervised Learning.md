机器学习面对的问题主要分为两种，分别称为“监督学习(supervised learning)”和“非监督学习(unsupervised Learning)”。

“监督学习”与“非监督学习”的根本区别在于“是否使用带有人为提供的标签(label)的数据训练模型”。例如，我们通常使用监督学习来训练“猫狗图片识别”的模型，这意味着训练之前我们必须为一系列图片写上答案“猫/狗”，这个答案就是“标签”。相反，非监督学习不需要提前为数据写上标签。例如，基于一个视频为观众推送“可能喜欢的视频”，这本质上是在寻找数据本身之间的关联（“聚类问题(clustering)”），不需要提前为每个视频打标签。

本文我们来讨论监督学习。监督学习主要分为“分类问题(classification)”和“回归问题(regression)”。这两类问题的根本区别在于答案空间是有限集还是无限集（答案是离散的还是连续的）。通常，前者是要将样本分为有限分类中的一类，后者是要预测一个连续变化的数值。例如，“猫狗图片识别”、“手写数字识别”属于分类问题；而“预测房价（根据时间、地点、面积、卧室数量等信息来预测房子的成交价格）”这样的问题属于回归问题。

## Ground Truth

让我们以用手写数字识别为例。输入一个包含众多像素点的图片，要求输出图片对应的数字（$0,1,2,\cdots,9$）。监督学习要做的事，就是收集大量手写数字图片，用人工的方式为每张图片标记上其对应的数字。设计一个带参数的模型，根据这些待标记的图片计算出一组合适的参数，期待这组参数能够较好的预测世界上所有的手写数字图片对应的数字。

$\newcommand{\X}{\mathscr{X}}\newcommand{\Y}{\mathscr{Y}}\newcommand{\P}{\mathbb{P}}\newcommand{\E}{\mathbb{E}}$由此可见，监督学习预设了一件重要的事，那就是对于世界上的任何一张图片（也即任意像素排列），人类对其识别结果有一个共同的认知。 例如，见到一个印刷体的数字“$2$”的图片，任何人都会同意这张图片的标签应该打上$2$。这称为图片所对应的ground truth标签。

> 然而，ground truth有时并不是唯一确定的。设想，对于一个潦草一画的圈的图片，有的人会说这张图片应该被标记为$0$，也有人会觉得应该标记为$6$。甚至，如果给定的图片是一张猫的图片，那么ground truth如何标记呢？为了从数学上统一所有这些“奇怪的情况”，我们认为ground truth不是一个确定的答案，而是所有可能答案的一个概率分布。在手写数字图片识别的问题里，也就是一个$\{0,\cdots,9\}$上的概率分布。

从数学上，如果我们设所有样本（图片）的集合为$\mathscr{X}$，标签集合为$\mathscr{Y}$。于是ground truth定义为$\X\times \Y$上的一个概率空间$(\X\times \Y,\sigma(\X\times\Y),\mathbb{P})$。绝大多数情况下，我们认为对于每个$x\in \X$，ground truth只对应一个唯一的标签。

> $\mathbb{P}(x)$的分布意味着“图片”本身也有一个概率分布。这其实预设了我们想要模型能解决怎么样的问题。例如，“猫的图片”在“手写数字识别”的ground truth下概率应当很小，因为我们并不期待模型能对猫的图片做出良好的预测。这也使得“每个$x\in \X$，ground truth只对应一个唯一的标签”这样的假设是合理的。

## Training Set

Ground truth的分布只在理论上存在，我们永远无法获得世界上所有图片，并对过去、现在、未来的世界上的全部人口做调查！因此现实中通常的做法是：选取一部分图片，并让一部分人为它们标注上标签（一般一个图片只标记一个正确答案）。当图片足够多，且标注的人头脑正常，那么就可以把这些图片的标注的概率分布“近似看作”ground truth。这个带有标注的“图片-标注”集合就称为一个训练集(training set)。

从数学上，我们总可以把训练集看作是按照ground truth $\P$独立同分布采样得到的（这恰好符合ground truth本身的含义，因为我们通常就是独立同分布地构造训练集的）。因此训练集$D$可以建模如下：

$$D=\{(x_i,y_i)\}_{i=1}^{n},\quad (x_i,y_i)\stackrel{\text{i.i.d}}{\sim}\P$$

训练集越大，训练集内样本的分布就越接近ground truth。
$Proof.$ $\forall x\in \X$，定义$x$在训练集$D$中出现的频率为$\hat P_n(x) = \dfrac{1}{n}\sum\limits_{i=1}^{n}\mathbb{1}[x_i=x]$。$\{\mathbb{1}[x_i=x]\}_{i=1}^{n}$是一列独立同分布的随机变量，根据（弱）大数定理，当$n\to\infty$时$\hat P_n(x) = \dfrac{1}{n}\sum\limits_{i=1}^{n}\mathbb{1}[x_i=x]$依概率收敛到$\E_{(X,Y) \sim \P}[\mathbb{1}[X=x]]=\P(X=x)$。$\blacksquare$

## Loss Function

机器学习的目标是要训练出用于预测的函数$f:\X\to \Y$，称为预测函数(prediction function)。从数学上，这可以看作从全体函数的结合$\mathcal{X}\to\mathcal{Y}$中选择一个函数。我们通常把的选择分为两个过程：第一步，选定一个基本的模型，这规定了一个$\X\to \Y$的函数类；第二步，调整模型的参数，也即找到$\mathscr{F}$中的“最好”的函数。

如何评价一个函数$f:\X\to\Y$是不是好的呢？直观上看，我们希望函数$f$的预测准确率尽量高，也即$f$要尽可能和ground truth贴近（注意是ground truth而不是训练集）。为此，我们首先需要一个比较$\Y$中任意两个元素的“接近程度”的指标，这可以建模为一个$\Y\times \Y\to \mathbb{R}^{\geq 0}$的函数$\ell$，称为损失函数(loss function)。损失函数越大，说明这两个标签越不接近。

有了loss function以后，我们自然可以这样建模来评估ground truth上$f$的表现：考察从ground truth中i.i.d采样的$x\in \X$的正确标签$y$和预测的标签$f(x)$的loss的期望。定义：$ $L(f):=\E_{(X,Y)\sim \P}[\ell(f(X),Y)]$$$L(f)$称为$f$的population risk或expected loss。

函数集$\mathscr{F}$上最小的population risk是$\inf\limits_{g \in \mathscr{F}}L(g)$，定义：$ $E(f):=L(f)-\inf\limits_{g \in \mathscr{H}}L(f)$$$E(f)$称为$f$的excess risk。

然而，在实际训练$f$的过程中，我们只在事先采样好的训练集$D$上评估$f$。训练时我们实际用来评估的是：$ $\hat L_n(f):=\dfrac{1}{n}\sum\limits_{i=1}^{n}\ell(f(x_i),y_i),\quad (x_i,y_i)\in D$$$\hat L_n(f)$称为$f$在训练集$D$上的empirical risk或training loss。训练的目的就是找到最小化empirical risk的函数$\hat f^*$，也即$\hat f^*=\arg\inf\limits_{f\in\mathscr{F}}\hat L_n(f)$。

注意，因为训练样本本身也是独立同分布的从ground truth采样的，所以empirical risk的期望就是population risk：$$\E_{(x_i,y_i)\stackrel{\text{i.i.d.}}{\sim}\P}[\hat L_n(f)]=\E_{(x_i,y_i)\stackrel{\text{i.i.d.}}{\sim}\P}\left[\dfrac{1}{n}\sum\limits_{i=1}^{n}\ell(f(x_i),y_i)\right]=\E_{(X,Y)\sim \P}[\ell(f(X),Y)]$$也即，empirical risk的估计与ground truth相比是没有bias的。
## Regression

## 线性回归(Linear Regression)

我们首先来考虑监督学习中的回归问题，其中最简单的回归问题就是线性回归：对于$n$个用于训练的数据点（分别对应着$p+1$维空间中的一个坐标$(x_{i1},\cdots,x_{ip},y_i)$，其中$x_{i1},\cdots,x_{ip}$是输入，$y_i$是输出。）我们要找到一个函数$f_{\beta}(x)$来拟合训练的数据集。在线性回归中，我们假定$f$是一个线性函数。换言之，我们<u>只用线性的模型</u>来考虑这个拟合问题。这样，寻找$f$就是寻找$p+1$个系数$\beta_0,\beta_1,\cdots,\beta_p$，令$f_\beta(x)=\beta_0+\beta_1x_{i1}+\cdots+\beta_px_{ip}$即可。为了方便起见，我们给输入增添上常数$1$来构成$p+1$维向量$x_i=(1,x_{i1},\cdots,x_{ip})$，这样就可以把$f$用向量形式写作$f_\beta(x_i)=\beta\cdot x_i$。

如何来判断$f_\beta$好不好呢？在机器学习中，我们定义一个代价函数(Cost Function)来定量刻画拟合函数的优劣，希望代价函数越小说明拟合越成功。在线性回归中，我们常用“误差平方和”作为代价函数：$J(\beta)=\dfrac{1}{2}\sum\limits_{i=1}^{n}(f_\beta(x_i)-y_i)^2$。代入$f_\beta(x_i)=\beta\cdot x_i$得到$J(\beta)=\dfrac{1}{2}\sum\limits_{i=1}^{n}(\beta\cdot x_i-y_i)^2$。这是一个关于$\beta$的二次函数，因此是一个凸函数，我们可以用梯度下降求出最小值。在梯度下降中我们做计算：$\dfrac{\partial J}{\partial \beta_j}=\dfrac{1}{2}\sum\limits_{i=1}^{n}\dfrac{\partial}{\partial \beta_j}(\beta\cdot x_i-y_i)^2$ $=\sum\limits_{i=1}^{n}(\beta\cdot x_i-y_i)x_{ij}$，因此我们的训练就是做迭代$\beta'=\beta+\alpha \sum\limits_{i=1}^{n}(y_i-\beta\cdot x_i)x_{i}$，其中$\alpha$称为学习率(Learning Rate)。我们看到，梯度下降的步长正比于整体的误差$\sum\limits_{i=1}^{n}(y_i-\beta\cdot x_i)$，因此称为批量梯度下降(Batch Gradient Descent)。我们也可以把迭代分$n$次执行，每次只做$\beta'=\beta+\alpha(y_i-\beta\cdot x_i)x_i$，这时步长正比于$(y_i-\beta\cdot x_i)$，可见每次我们是针对某一个样本点做优化，这个算法称为随机梯度下降(Stochastic Gradient Descent)。随机梯度下降的每一步迭代也都会让代价函数更小，在实践中当训练样本集很大时，随机梯度下降一般会更常用。

事实上，这个误差恰好是最小二乘法做线性拟合的误差函数，因此我们也可以选择不用梯度下降而直接代入最小二乘法的结论求出最优的$\beta$。设$X=\begin{bmatrix}x_1^\top \\\vdots\\ x_n^\top\end{bmatrix}$，$y=\begin{bmatrix}y_1\\\vdots\\y_n\end{bmatrix}$，有$\beta=(X^\top X)^{-1}X^\top y$。这个方法在数分课的[多元函数微分学](https://www.cnblogs.com/qixingzhi/p/17190057.html)与线性代数课的[正交性](https://www.cnblogs.com/qixingzhi/p/16861761.html)中我们都推导过。

为什么选择误差平方和作为代价函数呢？我们可以在一个概率假设下来解释这种选择。对于线性回归，假设对于样本集$X$我们选定了系数$\beta$，我们第$i$个样本点上的预测误差为$\epsilon_i=y_i-\beta\cdot x_i$。如果我们<u>假设</u>$\epsilon$总是独立同分布地满足正态分布的，即$\epsilon_i\sim \mathcal{N}(0,\sigma^2)$，于是有density $p(\epsilon_i=a)=\dfrac{1}{\sqrt{2\pi}\sigma}e^{-\frac{a^2}{2\sigma^2}}$。那么在给定$X,\beta$时，模型恰好预测出$(y_1,\cdots,y_n)$的概率密度就是$L(X,\beta)=\prod\limits_{i=1}^{n}\dfrac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(y_i-\beta\cdot x_i)^2}{2\sigma^2}}$，这称为我们预测的似然函数(Likelihood Function)。我们希望模型预测正确的概率尽量大，因此也就要最大化似然函数。这个方法称为最大似然估计(Maximum Likelihood Estimate)。对$L(X,\beta)$取对数，有$\ell(X,\beta)=\log L(X,\beta)=n\log \dfrac{1}{\sqrt{2\pi}\sigma}-\dfrac{1}{2\sigma^2}\cdot \dfrac{1}{2}\sum\limits_{i=1}^{n}(y_i-\beta\cdot x_i)^2$。这等价于最小化$\dfrac{1}{2}\sum\limits_{i=1}^{n}(y_i-\beta\cdot x_i)^2$，这正是代价函数$J(\beta)$。

## 逻辑回归(Logistic Regression)

接下来我们来考虑监督学习中的分类问题。作为最简单的分类问题，我们考虑二分类，也即对于输入$x_{i1},\cdots,x_{ip}$，输出只有$y_i\in {0,1}$两种情况。此时我们应该选择怎么样的模型来拟合这样非连续的数据点呢？

一个最简单的想法是，我们只在空间$\R^p$中选取一个平面（等价的，一个带有截距的方向向量$\beta$）从而把空间分为两个半空间，就以此作为分类的依据。那么写出函数$f(x,\beta)=\mathbb{1}[x_i^\top \beta>0]$：对于一侧的点，它们全都满足$X_i^\top \beta>0$，这时我们就认为它们属于$y_i=1$的一类；对于$X_i^\top\beta<0$的一侧，我们就认为它们属于$y_i=0$的一类。这个模型就是感知机(Perceptron)。很显然，大多数情况下是不能仅由一个平面来对样本点做分类的。但是如果数据确实是呈现以某个分界面为界在两侧分布的，感知机就能取得良好效果。

如何为感知机中的分离平面$\beta$设计一个代价函数呢？如果继续使用线性回归中的误差平方和函数$J(\beta)=\sum\limits_{i=1}^{n}(f(x,\beta)-y_i)^2$，我们发现这并不再是一个凸函数了，而且事实上也无法良好刻画误差。一个最常用的解决方法称为逻辑回归，它通过引入概率后把问题转化为了线性回归，取得了良好的效果。

在逻辑回归中，我们希望$f$把$x_i$映射到某个实数$p_i\in [0,1]$，令$p_i$表示<u>模型预测的</u>$y_i=1$的概率。当$p_i$接近$1$时，我们把它分类为$1$；当$p_i$接近$0$时，我们把它分类为$0$。当实际做分类时，我们可以选定一个分界线，比如$0.5$。当$f(x_i)>0.5$时，我们就返回1；当$f(x_i)<0.5$就返回0。经验表明，选取$f(X_i)=\dfrac{1}{1+e^{-x_i^\top \beta}}$是好的。其中，$g(z)=\dfrac{1}{1+e^{-z}}$称为sigmoid函数，它形如一个$S$形分布在$[0,1]$值域上。可以看到，要求$f(x_i)$大于某个值本质上就是在要求$X_i^\top \beta$大于某个值，因此实际上我们还是在做一个感知机，因为我们的模型本质上只是在选取一个分离平面。然而有了$f$以后，我们就有了一个简洁的定义代价函数的方法：假如$y_i$的真实值为$y_i^*$，那么由于我们把$p_i$看作了概率，“预测正确的概率”就可以写作$p_i^{y_i^*}(1-p_i)^{1-y_i^*}$，因为当$y_i^*=0$时它就取$1-p_i$，$y_i^*=1$时它就取$p_i$。代入sigmoid函数，$p_i=\dfrac{e^{x_i^\top \beta}}{1+e^{x_i^\top\beta}}$，得到$p_i^{y_i^*}(1-p_i)^{1-y_i^*}=\dfrac{e^{y_i^*x_i^\top \beta}}{1+e^{x_i^\top \beta}}$。可见整体全部预测正确的概率，也即逻辑回归的似然函数$L(\beta)=\prod\limits_{i=1}^{n}\dfrac{e^{y_i^*x_i^\top\beta}}{1+e^{x_i^\top \beta}}$。其对数形式是$\ell(\beta)=\sum\limits_{i=1}^{n}\left[y_i^*x_i^\top \beta-\log(1+e^{x_i^\top \beta})\right]$。相应的，预测错误的概率就可以表示为$1-\ell(\beta)$。

因此我们令代价函数：$J(\beta)=-\ell(\beta)$。这是关于$\beta$是一个凸函数！我们依然可以用梯度下降来求最小值。$\dfrac{\partial J}{\partial \beta_j}=-\sum\limits_{i=1}^{n}\left[y_i^*-\dfrac{e^{x_i^\top \beta}}{1+e^{x_i^\top \beta}}\right]x_{ij}=-\sum\limits_{i=1}^{n}(y_i^*-p_i)x_{ij}$，因此批量梯度下降的迭代公式就是$\beta'=\beta+\alpha\sum\limits_{i=1}^{n}(y_i^*-p_i)x_i$，相应地随机梯度下降的迭代公式是$\beta'=\beta+\alpha(y_i^*-p_i)x_i$。可见，梯度下降的步长正比于误差$(y_i^*-p_i)$，这一形式与线性回归是完全相同的，依然是一种“从错误中学习(learn from mistakes)”。

> 这一相似性不是巧合，如果我们将$f(x_i)=p_i=\dfrac{1}{1+e^{-x_i^\top\beta}}$变形为$x_i^\top\beta=\ln \dfrac{p_i}{1-p_i}$。其中，$\ln\dfrac{p_i}{1-p_i}$称为logit函数，是$[0,1]$到$\R$的单射。逻辑回归本质上是对$x_i$的一种<u>线性拟合</u>，使得实数可以对应某个概率，并使得这个概率尽可能地接近带有监督的样本$y_i$。而由于sigmoid函数中代入的是线性项$x_i^\top \beta$，这只不过是选取了一个分离平面罢了。如果将$x_i^\top\beta$替换为非线性的函数$\phi(x_i)$，那么分离面就可以拓展为曲面，而这就不能称为逻辑回归了，此时的代价函数可能不再是凸的，在求解$\beta$时可能会遇到诸多困难。

## 生成学习算法(Generative Learning Algorithms, GLA)

在线性回归与逻辑回归中，我们的算法本质上是建立了模型来预测条件概率$p(y\mid x)$。这样的算法称为判别学习算法(Discriminative Learning Algorithms)。与之相对的是生成学习算法，在这里我们不再通过学习由$x$的情况来预测$y$，而是学习如何从$y$反推出$x$的分布情况——我们建立模型来预测$p(x\mid y)$。例如在逻辑回归中我们最终训练出了一个分类面，于是我们通过比较样本与分类面的位置来做判断。而如果用生成学习算法来解决二分类问题，我们就应当能够给出$y=0$时$x$的概率分布情况，$y=1$时$x$的概率分布情况，而后根据条件概率的定义计算$p(y\mid x)=\dfrac{p(x\mid y)p(y)}{p(x)}$。做判断时，我们关心的是给定$x$时$p(y\mid x)$的相对大小。因此其实我们不关心分母$p(x)$，而只关心分子$p(x\mid y)p(y)=p(x,y)$。

### 高斯判别分析(Gaussian Discriminant Analysis, GDA)

依然考虑二分类问题，$x_i\in \R^d,y_i\in \{0,1\}$。我们建立以下概率模型：$y_i$满足Bernoulli分布，$p(y_i=1)=\phi$，$p(y_i=0)=1-\phi$。当$y_i$给定时，$x_i$满足高维正态分布：$x_i\mid y_i=0\sim \mathcal{N}(\mu_0,\Sigma)$，$x_i\mid y_i=1\sim \mathcal{N}(\mu_1,\Sigma)$（注意，这里假设协方差矩阵是相同的）。于是，$p(y_i)=\phi^{y_i}(1-\phi)^{1-y_i}$，$p(x_i\mid y_i=0)=\dfrac{1}{(2\pi)^{d/2}|\Sigma|^{1/2}}e^{-\frac{1}{2}(x-\mu_0)^\top \Sigma^{-1}(x-\mu_0)}$，$p(x_i\mid y_i=1)=\dfrac{1}{(2\pi)^{d/2}|\Sigma|^{1/2}}e^{-\frac{1}{2}(x-\mu_1)^\top \Sigma^{-1}(x-\mu_1)}$，那么$p(x_i\mid y_i)=p(x_i\mid y_i=0)^{1-y_i}p(x_i\mid y_i=1)^{y_i}$。根据最大似然估计，模型的目标就是要最大化$\prod\limits_{i=1}^{n}p(x_i,y_i\mid \phi,\mu_0,\mu_1,\Sigma)$。这等于$\prod\limits_{i=1}^{n}p(x_i\mid y_i, \phi,\mu_0,\mu_1,\Sigma)p(y_i)$。对这个式子取对数，记为Lagrange函数$L(\phi,\mu_0,\mu_1,\Sigma)=\sum\limits_{i=1}^{n}\left(\log p(x_i\mid y_i, \phi,\mu_0,\mu_1,\Sigma)+\log p(y_i)\right)$。代入$p$的表达式，分别计算$L$关于$\phi,\mu_0,\mu_1,\Sigma$偏导数等于0时求出$\phi=\dfrac{1}{n}\sum\limits_{i=1}^{n}\mathbb{1}[y_i=1]$，$\mu_0=\dfrac{\sum\limits_{i=1}^{n}x_i\cdot \mathbb{1}[y_i=0]}{\sum\limits_{i=1}^{n}\mathbb{1}[y_i=0]}$，$\mu_0=\dfrac{\sum\limits_{i=1}^{n}x_i\cdot \mathbb{1}[y_i=1]}{\sum\limits_{i=1}^{n}\mathbb{1}[y_i=1]}$，$\Sigma=\dfrac{1}{n}\sum\limits_{i=1}^{n}(x_i-\mu_{y_i})(x_i-\mu_{y_i})^\top$。这样模型的参数就直接计算完了。这个模型就称为高斯判别分析模型(GDA model)，它假定了样本点的概率密度在分类面两侧大致满足山峰状的正态分布。

如果我们把求得的$\phi,\mu_0,\mu_1,\Sigma$代入回$p(y_i=1\mid x_i)$这一项中，我们会发现它刚好满足$\dfrac{1}{1+e^{-\theta^\top x}}$的形式（$\theta\in \R^n$）。而这正是逻辑回归的建模方式。这意味着，GDA模型蕴含了逻辑回归。而反过来，逻辑回归是否蕴含GDA呢？我们发现，$p(y_i\mid x_i)=\dfrac{1}{1+e^{-\theta^\top x}}$并不能推出$p(x_i\mid y_i=1)$满足正态分布，可见逻辑回归并不能蕴含GDA。可见，GDA的假设是比逻辑回归更强的。（但实践表明，逻辑回归还是通常表现得比GDA更好）

### 朴素贝叶斯(Naive bayes)

GDA模型可以对连续空间中的$x$建模。下面讨论$x$只取离散值的情况。考虑这样一个文本分类问题(text classification)。假设文本中的每个单词都落在一个大小为$T$的字典中，那么我们可以用一个向量$x$来表示一个文本：$x$的第$i$维表示字典中的第$i$个单词是否在文本中出现，出现为1不出现为0（这样的建模方式忽略了文本中单词的出现顺序）。我们要把文本分类为垃圾文本和有效文本，这就是一个关于离散向量$x$的二分类问题。我们用生成模型来建模，即考虑建模$p(x\mid y)$。

朴素贝叶斯分类模型做出了下面的假设：给定$y$意义下，$x$的每一维的概率都是相互独立的。用$x^{(i)}$表示$x$的第$i$维，那么$p(x\mid y)=p(x^{(1)},\cdots x^{(T)}\mid y)=\prod\limits_{j=1}^{T}p(x^{(j)}\mid y)$。既然$x^{(j)}$只可能取0或1，我们假设它满足Bernoulli分布，假设$y$也满足Bernoulli分布，那么模型的参数只有以下几个：$\phi_{j\mid y=1}=p(x^{j}=1\mid y=1),\phi_{j\mid y=0}=p(x^{j}=1\mid y=0),\phi_{y}=p(y=1)$。那么$p(y_i)=\phi_y^{y_i}(1-\phi_y)^{1-y_i}$，$p(x_i^{(j)}\mid y_i)=p(x_i^{(j)}\mid y_i=1)^{y_i}p(x_i^{(j)}\mid y_i=0)^{1-y_i}$ $=(\phi_{j\mid y=1}^{x_i^{(j)}}(1-\phi_{j\mid y=1})^{1-x_i^{(j)}})^{y_i}(\phi_{j\mid y=0}^{x_i^{(j)}}(1-\phi_{j\mid y=0})^{1-x_i^{(j)}})^{1-y_i}$

同样地，我们写出Lagrange函数$L(\phi_y,\phi_{j\mid y=0},\phi_{j\mid y=1})=\prod\limits_{i=1}^{n}p(x_i, y_i)$ $=\prod\limits_{i=1}^{n}p(x_i\mid y_i)p(y_i)=\prod\limits_{i=1}^{n}\phi_{y}^{y_i}(1-\phi_y)^{1-y_i}\left(\prod\limits_{j=1}^{T}(\phi_{j\mid y=1}^{x_i^{(j)}}(1-\phi_{j\mid y=1})^{1-x_i^{(j)}})^{y_i}(\phi_{j\mid y=0}^{x_i^{(j)}}(1-\phi_{j\mid y=0})^{1-x_i^{(j)}})^{1-y_i}\right)$。对$L$取对数，分别对参数求梯度并令其等于0，得到$\phi_y=\dfrac{1}{n}\sum\limits_{i=1}^{n}\mathbb{1}[y_i=1]$，$\phi_{j\mid y=1}=\dfrac{\sum\limits_{i=1}^{n}\mathbb{1}[x_i^{(j)}=1\land y_i=1]}{\sum\limits_{i=1}^{n}\mathbb{1}[y_i=1]}$，$\phi_{j\mid y=0}=\dfrac{\sum\limits_{i=1}^{n}\mathbb{1}[x_i^{(j)}=1\land y_i=0]}{\sum\limits_{i=1}^{n}\mathbb{1}[y_i=0]}$。这样模型的参数就计算完了。代回$p(y_i=1\mid x_i)$的表达式里，有$p(y_i=1\mid x_i)=\dfrac{p(y_i=1,x_i)}{p(x_i)}$ $=\dfrac{p(x_i\mid y_i=1)p(y_i=1)}{p(x_i\mid y_i=0)p(y_i=0)+p(x_i\mid y_i=1)p(y_i=1)}$$=\dfrac{\left(\prod\limits_{j=1}^{T}p(x_i^{(j)}\mid y_i=1)\right)p(y_i=1)}{\left(\prod\limits_{j=1}^{T}p(x_i^{(j)}\mid y_i=0)\right)p(y_i=0)+\left(\prod\limits_{j=1}^{T}p(x_i^{(j)}\mid y_i=1)\right)p(y_i=1)}$。

在我们的例子中，虽然只考虑了$x^{(j)}$只能取$0,1$的情况。但是其它离散的情况也是类似的，只需要把Bernoulli分布替换成相应的概率密度即可。甚至在许多连续的情形，我们也可以先做离散化再采取朴素贝叶斯来建模（这经常会得到比GDA更好的结果）。

如果允许$x$在每一维上不仅能取$2$个值，那么此时我们就可以把文本中单词的顺序纳入考虑了！现在令$x^{(j)}$表示文本中的第$j$个单词在字典中的编号，那么$x$的每一维都在$|T|$中取值。我们依旧假设$x$的每一维在给定$y$时独立的，那么用多维的朴素贝叶斯模型我们就可以立刻建模上述过程。

> ### Laplace Smoothing
>
> 我们发现，在上面的基于朴素贝叶斯的文本分类例子中，假如字典中的某个单词在训练数据集中从未出现过，那么根据$\phi_{j\mid y=0},\phi_{j\mid y=1}$的公式它们都将等于0，代入$p(y_i=1\mid x_i)$就会出现$0/0$的情况——无法做出预测！为此，我们在$\phi$的分子上+1，分母上+2，这样就保证了分子分母恒不会取0。例如，现在$\phi_{j\mid y=1}'=\dfrac{1+\sum\limits_{i=1}^{n}\mathbb{1}[x_i^{(j)}=1\land y_i=1]}{2+\sum\limits_{i=1}^{n}\mathbb{1}[y_i=1]}$，这称为Laplace Smoothing。

































