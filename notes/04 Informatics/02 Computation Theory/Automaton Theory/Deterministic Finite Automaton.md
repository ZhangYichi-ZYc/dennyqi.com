对于一个alphabet $\Sigma$，我们称一个有限长字符序列$w=a_1\cdots a_n,a_i\in \Sigma$为$\Sigma$下的一个word，全体word（也即全体有限长$\Sigma$字符序列）记为$\Sigma^*$。定义$\Sigma$下的一个语言(language)为$\Sigma^*$的一个子集（也即某个$L\subseteq \Sigma^*$）。

长度为0的word记为$\epsilon$，这也是一个word；$\varnothing \subseteq \Sigma^*$，这也是一个language；

## DFA

一个确定性有限状态自动机(deterministic finite automaton, DFA)是一个五元组$M=(Q,\Sigma,\delta,Q_0,F)$。其中，$Q$是一个有限大小的集合，称为状态集(set of states)；$\Sigma$是一个alphabet；$\delta:Q\times \Sigma\to Q$称为状态转移函数(transition function)，在任意状态$q\in Q$，通过字符$a\in \Sigma$做状态转移，会到达状态$q'=\delta(q,a)$，这一过程可以简写为$q\stackrel{a}\to q'$；$Q_0\in Q$，称为初始状态(initial states)；$F\subseteq Q$，称为终止状态集合(set of final states)。

对于$\Sigma$中的一个word $w=a_1\cdots a_n$，如果从$M$的初始状态$Q_0$开始，依次以$a_1,a_2,\cdots,a_n$做状态转移，最终到达某个终止状态$q_f\in F$，就称自动机接受word $w$。如果终止状态$q_f\not\in F$，就称自动机不接受$w$。规定，语言$\varnothing$能被任何自动机接受。

如果$\Sigma$上的一个language  $L$中的每个word都能被自动机$M$接受，并且每个不属于$L$的word都不被$M$接受，就称$M$接受language $L$。此时$L$可以记作$\mathcal{L}(M)$。

## NFA

一个非确定性有限状态自动机(nondeterministic finite automaton, NFA)是一个五元组$M=(Q,\Sigma_\epsilon,\delta,Q_0,F)$。其中，$Q$是一个有限集，依然称为状态集；$\Sigma_\epsilon:=\Sigma\cup\{\epsilon\}$，NFA中空串也可以做状态转移；NFA的状态转移函数定义为$\delta:Q\times \Sigma_\epsilon\to 2^Q$，也即状态转移可以同时到达多个状态（有多条同一个字符的状态转移边）；初始状态也有多个，$Q_0\subseteq Q$；终止状态的定义和DFA相同，$F\subseteq Q$。

对于$\Sigma$中的一个word $w=a_1\cdots a_n$，如果存在状态序列$q_0q_1\cdots q_n$满足$q_0\in Q_0,q_{i+1}\in \delta(q_i,a_{i+1}),q_n\in F$，就称$M$接受$w$。和原先一样，如果$M$接受的word集合恰好是language $L$，就称$M$接受语言$L$。

## Regular Expressions

给定alphabet $\Sigma$，是否每个$\Sigma$下的language都存在某个DFA或NFA能接受它？“全体能被某个DFA接受的language集合”和“全体能被某个NFA接受的language集合”相比，哪个集合更大？第一个问题的答案是否定的，一般只有一部分language能被DFA或NFA接受，这类language被称为是regular的；第二个问题的答案是，这两个集合恰好相等，也即DFA和NFA在表达能力上等价。

### DFA与NFA表达能力的等价性

下面证明对于$\Sigma$下的任意一个language $L$，存在一个DFA $M$能接受$L$当且仅当存在一个NFA $N$能接受$L$。

还没写

### Regularity

对于$\Sigma=\{a,b\}$，我们证明language $\{\epsilon,ab,aabb,aaabbb,\cdots\}$（可以简写为$\{a^nb^n\mid n\in \N\}$）不能被任何NFA或DFA接受。只需证明不能被NFA接受。Pf. 如果存在这样一个NFA接受该language，那么对于任意$m\in \N$，$a^mb^m$能被该NFA接受，那么该NFA上存在一个状态转移序列：$q_0$出发，做$m$次字符$a$的转移，到达状态$q_t$，再做$m$次字符$b$的转移，到达状态$q_s\in F$。对于足够大的$m$，这一过程经过的$2m+1$个状态一定有重复（因为状态总数是有限的），假设重复发生在第$k_2$个字符转移到第$k_1$个字符时，这意味着状态转移形成了环，自动机可以在该环上重复转移任意多次，最终依然到达终止状态，这样接受的字符串一定不在language当中，矛盾。 Qed.

那么，符合什么条件的language是能被NFA接受的呢？我们先考察一下能被NFA接受的language的特性，根据这些特性总结出一套称为“正则表达式”的表达字符串的方法，然后证明一个language能被某个NFA接受当且仅当其能用正则表达式表示。

还没写。

$\stackrel{\infty}\exists$

## Infinite Words

定义$\Sigma$下的infinite word为$w=a_1\cdots a_n\cdots$，$\forall i\geq 1,a_i\in \Sigma$。$\Sigma$下的全体infinite word集合记为$\Sigma^\omega$。

对于一个$\Sigma$下的language $L$，也即对于$L\subseteq \Sigma^*$，记$L^\omega$表示集合$\{w\in \Sigma^\omega\mid w=w_1\cdots w_n\cdots,w_i\in L\}$，它是$L$中的word拼成的infinite word集合。注意，如果$\epsilon\in L$，那么$L^\omega$中包含finite word，根据定义，性质$L^\omega\subseteq \Sigma^\omega$不成立；如果$\epsilon\not\in L$，那么$L^\omega\subseteq \Sigma^\omega$成立。

### NBA

我们无法判定一个infinite word是否被NFA接受，因为它永远不会停止状态转移。如何用一个有限状态自动机来定义一个无限字符串是否被接受呢？一个方法是判断：在状态转移过程中，是否无穷次经过终止状态。

非确定性Buechi自动机(nondeterministic Buechi automata, NBA)定义如下：











