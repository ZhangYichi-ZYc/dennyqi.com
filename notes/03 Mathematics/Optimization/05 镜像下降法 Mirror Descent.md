我们已经知道梯度下降的每一次迭代可以看作求$\hat f(x)=f(x_k)+\lang \nabla f(x_k),x-x_k\rang+\dfrac{1}{2\eta}\|x-x_k\|^2$的最小值，而$\hat f(x)$的选取其实并不是唯一的，换言之我们不一定要选取二次函数。二次函数的特殊性（例如对称性）有时并不能很好的刻画原函数$f(x)$的几何特性，这可能使得梯度下降算法表现得不那么优秀。假设我们选取另一个函数$g$（注意必须是凸函数），当然我们还是希望保证其线性部分是不变的，因此实际上我们关注的是$g(x)-g(x_k)-\lang \nabla g(x_k),x-x_k\rang$这一项。这一项称为Bregman divergence(布雷格曼散度)，记为$D_g(x,x_k)$，表示一个函数与自己线性近似的误差。我们的新算法要求$f(x_k)+\lang \nabla f(x_k),x-x_k\rang+\dfrac{1}{\eta}D_g(x,x_k)$的最小值，也就是等价地要求$\lang \nabla f(x_k),x\rang+\dfrac{1}{n}D_g(x,x_k)$的最小值。注意到$\nabla^2_x D_g(x,y)=\nabla^2 _x g(x)$，既然$g$是凸函数，因此$D_g(x,y)$关于$x$也是凸函数。而$\lang \nabla f(x_k),x\rang$是仿射项，因此$\lang \nabla f(x_k),x\rang+\dfrac{1}{n}D_g(x,x_k)$整个函数是凸函数，其最小值点$x_{k+1}$应当满足梯度为0，因此$\nabla f(x_k)+\dfrac{1}{\eta}\nabla_x D_g( x_{k+1},x_k)=0$，其中根据定义$\nabla _x D_g(x,x_k)=\nabla g(x)-\nabla g(x_k)$，化简得到$\nabla g(x_{k+1})=\nabla g(x_k)-\eta \nabla f(x_k)$​。这就是我们做梯度下降的新方法。

如果选定$g$，$\nabla g(x_k)$是容易求出的，但得到了右边的结果$\nabla g(x_{k+1})$以后，怎么反过来求出$x_{k+1}$呢？这意味着我们要能够求出梯度的逆映射（$\R^n\to \R^n$）。这要用一个称为Convex conjugate(凸共轭)的方法。我们对于凸函数$f$定义它的共轭函数$f^*(v)=\max\limits_{y} \{\lang v,y\rang-f(y)\}$，下面我们证明$(\nabla f)^{-1}(v)=\nabla f^*(v)$始终成立：注意到$\lang v,y\rang$关于$v$是仿射的，$f$是凸的，而对凸函数逐点求最大值依然是凸函数，因此$f^*$是凸函数。如果$v$取$\nabla f(x)$，那么由凸函数的一阶条件有$f(y)\geq f(x)+\lang v,y-x\rang$，整理得到$\lang v,y\rang-f(y)\leq \lang v,x\rang-f(x)$，也即$f^*(v)=\max\limits_{y} \{\lang v,y\rang-f(y)\}\leq \lang v,x\rang-f(x)$，而当且仅当$y=x$时取到等号，因此有$f(x)+f^*(v) = \lang v,x\rang$对任意$x$成立。而根据共轭函数的定义，对于任何的$v$都有$f^*(v)\geq \lang v,x\rang-f(x)$，而当$v\neq \nabla f(x)$时等号不成立。因此$f(x)+f^*(v) = \lang v,x\rang$这个等式成立当且仅当$v=\nabla f(x)$。现在我们发现$f^{**}=f$始终成立，任何一个函数共轭两次就会回到本身，因为$f^{**}(x)=\max\limits_{v}\{\lang v,x\rang-f^*(v)\}$$=\max\limits_{v}\{\lang v,x\rang+\min\limits_{v'}\{-\lang v',v\rang+f(v')\}\}\leq$$\max\limits_{v}\{\lang v,x\rang-\lang x,v\rang+f(x)\}=f(x)$，$f^{**}(x)=\max\limits_{v}\{\lang v,x\rang-f^*(v)\}\geq$$\lang \nabla f(x),x\rang-f^*(\nabla f(x))=f(x)$，因此$f^{**}(x)=f(x)$。那么依然取$v=\nabla f(x)$，那么$f(x)+f^*(v) = \lang v,x\rang$可以写作$f^{**}(x)+f^*(v) = \lang v,x\rang$，把这看作上式关于$f^*$的结论写作$f^*(v)+f^{**}(x)=\lang v,x\rang$，根据取等条件必须是梯度得到$x=\nabla f^*(v)$，也即$(\nabla f^{-1})(v)=\nabla f^*(v)$。

我们把以上这个方法称为镜像下降法(Mirror Descent)。“镜像”其实是从高观点来看上面的算法：我们发现，梯度下降并不是一个仿射不变的算法，这本质上是由于$x_{k+1}=x_k-\eta \nabla f(x_k)$本身就不是一个“合理”的表达式——梯度并不完全是一个“向量”，因为梯度是微分，而微分是线性映射。只不过在有限维欧氏空间中我们可以用矩阵来表示线性映射，但这种表示是非常依赖于坐标选取的。一个线性空间$\R^n$中所有的线性映射（泛函）$\R^n\to \R$构成了对偶空间，梯度本质上是对偶空间中的向量。通过上面“镜像下降”的方法，我们实际上把$x_{k+1}=x_k-\eta \nabla f(x_k)$换作了$\nabla g(x_{k+1})=\nabla g(x_k)-\eta \nabla f(x_k)$，这样的递推式就显得合理了，因为一切都是在对偶空间这一“镜像”中完成了。我们要做的就是通过$\nabla g$这一从原空间到对偶空间的映射把$x_k$投影到镜像，在对偶空间中做一步下降，然后再用逆映射还原到原空间。

如何选取凸函数$g$呢？我们希望$D_g$是容易求最小值的，并且能比较好地反应$f$的几何性质。如果$g$是严格凸的，那么根据凸函数的一阶条件$D_g(x,y)>0$当且仅当$x \neq y$，同时$D_g(x,x)=0$。可见Bregman divergence很像是在描述一种“距离平方”。而恰恰，我们现在正是要用它来代替原来的$\dfrac{1}{2\eta}\|x-x_k\|^2$这一项。我们有Bregman divergence意义下的余弦定理$D_g(x,y)+D_g(x,z)=D_g(x,z)+\lang \nabla g(z)-\nabla g(y),x-y\rang$。利用距离平方和可以描述钝角，在Bregman divergence意义下就是$D_g(y,x_0)\geq D_g(y,x^*)+D_g(x^*,x_0)$。这个结论附加上一个凸函数也依然是正确的，因此$L(y)+D_g(y,x_0)\geq L(x^*)+D_g(y,x^*)+D_g(x^*,x_0)$。结合$f(y)>f(x_k)+\lang \nabla f(x_k),y-x_k\rang$得到$f(y)-f(x_k)\geq\dfrac{1}{\eta}(D_g(y,x_{k+1})-D_g(x_k,x_{k+1})-D_g(y,x_k))$。分析可得，如果$f$是$D_g$意义下$L$-Lipschitz的， 那么如果迭代$T$轮则可以取$\eta=\dfrac{2}{L}\sqrt{\dfrac{R}{T}}$，那么有$f(x_k)\leq f(x^*)+L\sqrt{\dfrac{R}{T}}$；如果$f$是$L$-smooth且$g$是$\sigma$-强凸的（两者的范数必须是同一个，但形式可以自选，这是Mirror Descent优势），那么假设$D_g$有上界$R$，那么取$\eta=\dfrac{\sigma}{L}$运行$T$轮有$f(x_k)\leq f(x^*)+\dfrac{LR}{\sigma T}$。











