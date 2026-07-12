## 声波

波动现象出现在物理学的许多领域中，力学中出现振动传播形成的机械波，电磁学中出现电磁波，在现代物理学中还有给出发现粒子概率的物质波。下面我们以力学中的声波作为一个波的特殊的对象来讨论。

声学是力学的一个分支，所以它要用牛顿定律来解释。声波由一处往另一处传播，只是力学定律及传播声的那种物质（介质）的性质的推论。

### 波动方程

现在考虑声波的一维传播。当一个物体在空气中的某个地方运动时，会有一种扰动在空气中传开。这种扰动可以被描述为是由物体运动产生的空气压强的变化：当物体运动得很快时，空气没有足够得时间绕过物体流过去，于是随着物体得运动而被压缩，这引起了压强得变化。这种变化推动了周围的其它气体，接着这些气体又被压缩，于是又引起更远处空气的压强变化，这样就有一种“波”传播开了。为了用数学描述这个过程，我们用$\chi(x,t)$来描述原始位于坐标$x$的“一小块”气体在$t$时刻的位移情况，$P(x,t)$来描述这块气体中的压强，$\rho(x,t)$来描述密度，等等。

考虑平衡状态时位置$x$处的一小块气体和位置$x+\Delta x$处的一小块气体。经过$t$时刻后，它们分别到达了位置$x+\chi(x,t)$和$x+\Delta x+\chi(x+\Delta x,t)$。假设平衡状态时气体密度为$\rho_0$，在$\Delta x$足够小时可以认为$t$时刻两位置之间气体密度为常数$\rho$，那么由于前后时刻两位置间气体质量不变得到等式$\rho_0\Delta x=\rho(\Delta x+\chi(x+\Delta x,t)-\chi(x,t))$，其中$\chi(x+\Delta x,t)-\chi(x,t)\approx \left(\dfrac{\partial \chi}{\partial x}\right)\Delta x$，于是$\rho_0\Delta x=\rho(\Delta x+\left(\dfrac{\partial \chi}{\partial x}\right)\Delta x)$，也即$\rho_0=\rho(1+\left(\dfrac{\partial \chi}{\partial x}\right))$。记$\rho=\rho_0+\rho_e$，那么$\rho_e+(\rho_0+\rho_e)\left(\dfrac{\partial \chi}{\partial x}\right)=0$。其中，$\rho_e$是小量，$\rho_e\dfrac{\partial \chi}{\partial x}$一项可以忽略，于是有$\rho_e=-\rho_0\dfrac{\partial \chi}{\partial x}$。而压强是关于密度的函数（无论气体、液体还是固体），所以$P_0=f(\rho_0)$，$P_0+P_e=f(\rho_0+\rho_e)\approx f(\rho_0)+f'(\rho_0)\rho_e$，因此$P_e\approx f'(\rho_0)\rho_e$，其中$f'(\rho_0)$是常数，记为$\kappa$，那么$P_e=\kappa \rho_e$。现在考虑气压差对空气块产生的力，由此列出牛顿运动方程：由$t=0$时刻计算出厚度为$\Delta x$的空气片质量为$\rho_0\Delta x$，$t$时刻压强差为$P(x,t)-P(x+\Delta x,t)\approx -\dfrac{\partial P}{\partial x}\Delta x=-\dfrac{\partial P_e}{\partial x}\Delta x$，其加速度由$\chi$的二阶导数给出，那么由牛顿第二定律$\rho_0\Delta x\dfrac{\part^2 \chi}{\partial t^2}=-\dfrac{\partial P_e}{\partial x}\Delta x$。代入$P_e=\kappa \rho_e$并化简得到$\rho_0\dfrac{\part^2\chi}{\partial t^2}=-\kappa\dfrac{\partial \rho_e}{\partial x}$，再代入$\rho_e=-\rho_0\dfrac{\partial \chi}{\partial x}$得到：$\dfrac{\part^2 \chi}{\partial t^2}=\kappa\dfrac{\part^2 \chi}{\partial x^2}$。这就称为波动方程。

我们来看波动方程告诉了我们什么。我们来验证，声波的波形随时间以恒定地速度向前平移，这等价于对任意函数$f$，代入$\chi(x,t)=f(x-vt)$满足波动方程：等式左侧$\dfrac{\part^2}{\partial t^2}=\dfrac{\part}{\partial t}(-vf'(x-vt))=v^2f''(x-vt)$，等式右侧$\kappa\dfrac{\part^2 \chi}{\partial x^2}=\kappa f''(x-vt)$。这意味着$\kappa=v^2$，也即速度确实是恒定的。记波的传播速度为$c_s$，我们可以把波动方程进一步写为$\dfrac{\part^2 \chi}{\partial t^2}=c_s^2\dfrac{\part^2 \chi}{\partial x^2}$。再来验证，一维情形下声波会同时向左或向右传播，只需验证$\chi(x,t)=g(x+vt)$同样满足波动方程即可，此处省略。同时，由于微分有线性性，所以当$\chi(x,t)=\chi_1(x,t)+\chi_2(x,t)$时，假如$\chi_1,\chi_2$都是波动方程的解，那么$\chi$也是波动方程的解，这证实了叠加原理成立，一列波可以分解为多个波的叠加。

在上述验证的过程中我们得到了$\kappa=c_s^2$，而$\kappa:=f'(\rho_0)=\left(\dfrac{\partial P}{\partial \rho}\right)_0$。因此，波在介质中的波速实际上就由公式$c_s^2=\left(\dfrac{\partial P}{\part\rho}\right)_0$给出。而声波中压强随密度的变化是一种绝热变化，此时$PV^\gamma$为常数。而体积与密度成反比，因此$P$正比于$\rho^\gamma$。设$P=C\rho^\gamma$，有$\dfrac{\partial P}{\partial \rho}=C\gamma\rho^{\gamma-1}=\dfrac{C\gamma\rho^\gamma}{\rho}=\dfrac{\gamma P}{\rho}$。因此$c_s^2=\dfrac{\gamma P}{\rho}=\dfrac{\gamma PV}{\rho V}=\dfrac{\gamma NkT}{Nm}=\dfrac{\gamma kT}{m}$，由此可见声速只与温度和介质材料有关。进一步代入$kT=\dfrac{1}{3}m\lang v^2\rang$，可得$c_s^2=\dfrac{\gamma}{3}\lang v^2\rang$，这表明声速的大小与分子的平均速率有相同的数量级，大约为分子平均速率的一半。















