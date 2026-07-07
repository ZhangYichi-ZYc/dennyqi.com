如果函数的参数类型不确定，可以使用函数模板

```C++
template <class T>
T max(T a, T b){
	return a>b ? a : b;
}
```

如果类的成员类型不确定，可以使用类模板。这样定义类：

```c++
template <class T>
class qxz{
	T a;
}
```

在类外定义成员函数：

```c++
template <class T>
int qxz<T>::fff(int a, int b){
	...
}
```

用实际的类型声明对象称为类模板的实例化，比如将`char`作为实际类型声明这个类，需要声明`qxz<char> tmp;`

类模板不一定只有“类型”这一个参数，还可以传入其它参数。例如声明`template <class T, int l, int r>`，在定义实际类型时声明`qxz<char,1,100> tmp;`。

类型参数可以置顶默认值，例如`template <class T = int>`，声明时只需`qxz<> tmp;`

为类模板申请友元时可以对于所有可能类型参数申请，也可以对于特定类型申请。对于类友元，如果只申请`int`时的友元，写`friend class B <int>;`。友元函数也可以限定特定的参数，如`friend void f(int a);`代替`friend void f(T a);`。