对于在$g_i(x)=0,h_i(x)\leq 0$的约束下最小化$f(x)$的问题（并不要求convex），我们有Lagrange函数$L(\vec x,\vec \lambda,\vec \mu)=f(\vec x)+\vec\lambda^\top \vec g(\vec x)+\vec\mu^\top\vec h (\vec x)$。$(x^*,\lambda^*,\mu^*)$处的KKT条件可以简洁地描述为$\nabla _{x,\lambda}L(x^*,\lambda^*,\mu^*)=0$，$\nabla_\mu L(x^*,\lambda^*,\mu^*)\leq 0$，$(\mu^*)^\top \nabla _\mu L(x^*,\lambda^*,\mu^*)=0$，其中$\mu^* \in \R^k_{\geq 0}$。

我们注意到可行域中$x$始终满足Lagrang函数是$f$的下界，因为可行域中始终成立$g=0,h\leq0$，而$\mu\geq 0$，因此$L(x,\lambda,\mu)\leq f(x)$。而又有$L(x,0,0)=f(x)$。所以$f$本质上就是$L$的最大值：$f(x)=\max\limits_{\lambda; \ \mu\geq 0} L(x,\lambda,\mu)$。于是最优解$x^*$就可以表示为$f(x^*)=\min\limits_{x \in \text{dom} f}\max\limits_{\lambda; \ \mu \geq 0} L(x,\lambda,\mu)$。

一般情况下，$\min$和$\max$的顺序是不能交换的。事实上任何时候我们都有以下min-max不等式：$\min\limits_{x \in X}\max\limits_{y \in Y}F(x,y)\geq \max\limits_{y \in Y}\min\limits_{x \in X}F(x,y)$，也就是说先求关于某变量的最大值再求另一变量的最小值总是能得到一个更大的结果。因为对于任意的$y_0$，$\min\limits_{x \in X}F(x,y_0)\leq \min\limits_{x \in X}\max\limits_{y \in Y}F(x,y)$，右侧是一个定值，因此当对$y_0$取$\max$时也成立，这样就得到了min-max不等式。这一事实不是出乎意料的，因为我们早已接触过类似问题。例如，在研究数列极限时我们证明过上极限始终大于等于下极限，而上极限和下极限本身就可以用min-max来定义。

所以对于$\min\limits_{x \in \text{dom} f}\max\limits_{\lambda; \ \mu \geq 0} L(x,\lambda,\mu)$，我们有$\min\limits_{x \in \text{dom} f}\max\limits_{\lambda; \ \mu \geq 0} L(x,\lambda,\mu)\geq \max\limits_{\lambda; \ \mu \geq 0}\min\limits_{x \in \text{dom} f} L(x,\lambda,\mu)$。记$\min\limits_{x \in \text{dom} f} L(x,\lambda,\mu)=\phi(\lambda,\mu)$，就有$\min\limits_{x \in \text{dom} f}f(x)\geq \max\limits_{\lambda; \ \mu \geq 0}\phi(\lambda,\mu)$，简写为$f^* \geq \phi^*$。这就是最优化问题的对偶性！$\phi(\lambda,\mu)$称为原问题的Lagrange对偶函数，$\max\limits_{\lambda; \ \mu \geq 0}\phi(\lambda,\mu)$称为原问题的对偶问题。注意这不仅仅在convex时成立，而是对于任何带等式和不等式约束的最优化问题中成立。如果原问题恰好是线性规划问题，它的对偶问题恰好就是我们之前得到的线性规划的对偶规划。

线性规划是具有强对偶性的，也即对偶规划和原问题取到相同的极值，gap为0。现在我们看到对于任何一般的最优化问题，都有$f^* \geq \phi^*$，也即弱对偶性对一般的最优化问题是恒成立的。那么我们自然要追问，满足什么条件时一般的最优化问题也有强对偶性？下面的定理告诉我们对于<u>凸优化问题</u>而言，<u>如果在$x^*$处KKT条件成立</u>（这意味着$x^*$是最优解，并且有乘子$\lambda^*,\mu^*$存在），那么强对偶性成立，同时$(\lambda^*,\mu^*)$恰好是对偶问题的最优解。为此，我们只需要说明存在$x,\lambda,\mu$使得$f(x)=\phi(\lambda,\mu)$成立。对于我们根据KKT条件得到的$\lambda^*,\mu^*$，$\phi(\lambda^*,\mu^*)=\min\limits_{x \in \text{dom} f} L(x,\lambda^*,\mu^*)$，而在凸优化问题中$f$是凸函数，$g,h$是仿射函数，因此$L(x,\lambda^*,\mu^*)$关于$x$是凸函数，而根据KKT条件$\nabla _x L(x^*,\lambda^*,\mu^*)=0$，因此$x^*$就是$L(x,\lambda^*,\mu^*)$的极小值点，而恰好$L(x^*,\lambda^*,\mu^*)=f(x^*)$，因此$\phi(\lambda^*,\mu^*)=f(x^*)$。（反过来，如果强凸成立，并且原问题和对偶问题都有<u>有限最优解</u>，记为$x'$和$(\lambda',\mu')$，那么可以验证$(x',\lambda',\mu')$在原问题中满足KKT条件。）

引入对偶的一个重要原因就在于，对偶问题相较于原问题而言往往更容易求解。例如，任何优化问题（不一定convex）的对偶问题中，Lagrang对偶函数$\phi(\lambda,\mu)$一定是concave的，这意味着哪怕一个不是凸优化问题的对偶问题也总是一个凸优化问题！这是因为$L(x,\lambda,\mu)$是关于$\lambda,\mu$的仿射函数，仿射函数既是convex的又是concave的。$\phi(\lambda,\mu)$定义为了$L$关于$x$逐点求最小值，我们证明过一列concave函数（不要求可数）逐点求最小值后得到的函数依然是concave的，因此$\phi$一定是concave函数。

另外我们注意到并不是所有凸优化问题都有强对偶性成立的（在上面的充分条件中我们还要求KKT条件成立），考虑在$x_1^1/x_2<0,x_2>0$的约束下求$e^{-x_1}$的最小值，它的结果是1；而它的对偶问题得到的结果却是0。这个反例反映出了凸优化问题在边界上的一些效应，这导致强对偶性失效了。只要我们弥补上边界的情况，就能得到下面这个一般的结论(Slater's Condition)：对于凸优化问题，如果在函数的定义域内存在一个“相对内点(relative interior points, 'relint')”$x$使得$g_i(x)=0,h_j(x)<0$成立，那么强对偶性成立。其中，相对内点是相较于一般讨论的内点做出的一点修正，一般的内点要求存在一个整个的球状小邻域都落在定义域内，而这里只要求把球状小邻域对原定义域的仿射空间求交后落在定义域内，例如在空间中，一条线段的相对内点就是除了端点的所有点，一个圆盘的相对内点就是除了圆周上的所有点。















