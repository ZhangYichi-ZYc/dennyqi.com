很多人容易小看“prompt engineering”，认为这样的工作只是“调用大模型”而已。事实上随着时代的发展，“调用大模型”完成任务已经悄然成为了软件工程的新范式。相比之下， 传统软件工程只能完成由人事先编写的精确任务，这样的工程代替人完成重复的、机械的劳动，这样的劳动是完全基于某个形式系统框架的。而涉及大模型调用的任务，往往涉及一些需要相当“智能”的劳动。在大模型的“理解能力”有限的前提下，为了让大模型的输出有尽量好的表现，人们发现了各式各样提升大模型能力的方法。这些方法或许终将被未来更智能的AI淘汰，但它们是“通向更智能的AI的道路”上不可或缺的。这类方法不像微调或强化学习这样的需要庞大数据作为基础，而是通过设计一个精巧的、多阶段的prompt系统，来提升大模型的输出质量。这样的工作实际上已经超越prompt engineering，而被称为context engineering。

Context engineering的任务是要设计一个优秀的系统来让LLM帮助我们完成一个复杂任务。然而，这个系统中每次调用LLM时prompt的context(上下文空间)是有限的。因此，每一次prompt都需要尽可能精确地将信息展示给LLM。同时，系统要有一个精妙的机制统筹LLM给出的每一个回答，从而达到效率最大化。

## Prompt Engineering

### Atom Prompt

最简单的prompt就是生活中人们常用的“一句话prompt”，这通常称为atom prompt。例如：

`写一篇标题为‘什么是梦想’的作文，不超过800字`

尽管只有一句话，但这句话里涵盖了关于我们想让LLM完成的任务的最核心的信息：工作——“写作文”；要求——“标题为‘什么是梦想’”、“不超过800字”。在atom prompt中，模型的输出质量完全来自模型自身训练和微调得到的知识储备和格式规范。

关于atom prompt，人们发现了一些重要的提升LLM回答质量的方法。

- Persona: 实验表明，在prompt中规定LLM的“身份”很有用，比如“你是一个写作文高手”或“你是一个数学推理专家”等等，“身份”有利于模型明确任务类型，更好的“注意到”相关知识；

- Let's think step-by-step: 实验表明，在推理任务中，告诉模型“Think step-by-step”很有用。模型会一步一步分析，自行把任务拆解成一系列更小的任务，从而有更明确的思考框架和更多的token来思考；

LLM needs tokens to think. Token是LLM思维的载体。对于复杂的，需要推理或计算的任务，千万不要要求LLM直接输出答案，而是要预留充分的token空间让模型做思考。这就是通常人们所说的Chain-of-Thought(CoT)范式。

### Few Shot Learning

Prompt engineering最重要的一个发现就是：样例展示是提升大模型能力的最强有力方法。大模型特别擅长pattern的模仿。实验表明“0个示例”和“几个示例”相比，后者的输出质量能提升10%~30%。

Few Shot Learning的prompt已经形成通用的模板格式：

  ```
  <Task Description>
  
  <Constraint>
  
  Input: <example 1>
  Output: <result 1>
  ...
  Input: <example n>
  Output: <result n>
  ...
  Input: <task>
  ```

在Few Shot Learning中，样例的选取以及排列顺序很关键。一般而言，所选样例要满足以下几个条件，才能使得模型表现最佳：

- 覆盖范围广。样例的形式要覆盖到各种可能在实际任务中出现的形式；
- 多选出现频率高的样例。因为这样的样例在实际中出现的也多，所以在这方面大力加强能提高模型的总体表现。
- 要包括最困难的情况。要提供实际中可能出现的情况中最复杂的情况，由此模型就能了解任务的“边界”在哪里。
- 难度要从易到难排序。
- 要有反面教材。不仅要提供完全错误的反面教材，还要提供“常见错误”的、“差一点点就对”的反面教材。

样例的数量选择也很重要。实践表明，随着样例的增多，“输出表现-样例数量”曲线的斜率会区域平缓，如果prompt太长输出表现甚至会下降。从2个样例增加到5个样例，模型的表现会大大增强。但是从20个样例增加到25个样例，表现得增强就没有那么显著了。另一方面，样例越多，调用一次LLM的时间和金钱成本就越高。所以对于样例数量，我们需要找到一个“效益”最大的平衡点。

有时候，任务太复杂时，即便达到了平衡点，模型的表现仍然无法达到要求。这时候可以尝试构建“动态prompt”：建立一个包含众多样例的样例库，当读取到用户输入时，首先设计一个分析机制（比如一次LLM调用）分析出样例库中与该输入最相关的若干样例，提取出这些样例组成本次的prompt，用这个prompt去调用大模型。实验表明这样做能显著提升模型的表现。

### Structured Output

实验表明，LLM特别擅长用JSON格式做结构化输出。在预训练和微调中，LLM见过大量JSON格式的数据。同时，现代的api调用很多也都支持强制JSON格式输出（这种强制是神经网络output layer上的概率权重层面的强制，不是prompt engineering）。对于高度结构化的输出任务，选择JSON格式化输出往往是最有效方法。

Structure Everything！能够结构化的就尽量都用结构化的方式来处理（既包括输入也包括输出）。

### Chain-of-Thought Prompting

对于复杂的推理或计算任务，我们不仅可以要求LLM “Let's think step-by-step”，而且可以引导模型怎样“一步一步分析”。例如：首先重述问题，确保理解准确；然后一步一步解题；验证答案是否正确；输出答案。

为了做到这一点，除了可以在“要求”里明确对LLM提出应当怎样一步一步分析，还可以在样例中加入“thinking”字段：

```
<Task Description>

<Constraint>

Input: <example 1>
Thinking: <thinking 1>
Output: <result 1>
...
Input: <example n>
Thinking: <thinking n>
Output: <result n>
...
Input: <task>
```

这样，模型就可以模仿样例中的思考方式来做思考。

很重要的一个实验结果是：让模型在CoT中自行反思、修改，会大幅提升回答质量。如果问题比较复杂，你通常需要在引导模型在得出结果以后，必须思考“让我们来验证一下这真的对吗”，如果验证结果是否定的，则模型需要被引导重新解决问题。 直到模型对自身产生的答案足够满意，再输出答案。

### Cognitive Process

让我们总结一下以上提到的prompt engineering的技巧，并试图理解为什么它们是有效的。

人类之所以能够解决复杂问题，是因为人类的认知过程有以下几个关键特点：

- 人类会做启发式(heuristic)的思考，能够跳出形式系统的逻辑框架，建立绕过逻辑细节的思维捷径，建立大局观，从而有效的把大问题分解为小问题；
- 人类会将信息整理成有条理的结构，提高思考问题以及查阅资料的效率；
- 人类在思考困难的问题时的基本方法是“猜想-验证-修改猜想-再次验证...”，是一个“idea-thinking-reflection”的循环过程。

从实验得出的这些prompt engineering技巧中可以看出，一个适合LLM的好的prompt往往是和人类解决任务的“认知过程(Cognitive Process)”是非常类似的。一个好的prompt应当充分利用人类认知过程的这些特点：

- 发挥LLM思考的优势，进行问题的分解。
- 利用结构化的方式来处理信息。
- 用“思考-执行-反思”的Verification Loop范式来prompt LLM。

## LLM Agent

以上讨论的都是单次的prompt调用。对于这样的调用，LLM的输出质量取决于其自身的知识储备，以及你对问题描述的完善程度。而很多时候，这样的单次调用是不足以解决复杂任务的。例如，用户自己设计了一套程序语言，并且实现了一个parser，想让LLM来帮他用这套语言写程序。由于任务复杂，并且LLM自身的知识储备不包含这套全新的语言，单次prompt的方法很可能会失败。我们注意到，这样的任务即便对一个人类来说也是困难的，人类需要不断地通过parser的反馈信息来调试自己的代码，修正语法错误，但是单次prompt的LLM无法获取这些信息。因此，一个很自然的办法是，能不能让LLM和这个parser实现多轮的交互？这样的工程就不再只是prompt engineering，而是一个能调用外部工具的AI agent了。

### Memory Management

单次prompt调用LLM是不会保留历史调用信息的。每一次调用LLM做出的回答都是互相独立的。而与外部工具多轮交互的agent通常需要能看到交互的历史信息。假设当前是第$n+1$轮交互，在本轮交互中，理想的情况是要能把前$n$轮交互的所有历史信息都传递给LLM。但是，这样的坏处在于占用太多token，同时context过长可能导致LLM注意力不集中。

为了解决这一问题，人们提出了很多有效的memory management方法：

- 滑动窗口：只提供最近$K$轮的用户输入和LLM回答。这样的“滑动窗口”的好处是能够有效控制context长度，坏处在于遗漏了早期的对话，可能漏掉重要信息。
- 历史概要：把前$n$轮的用户输入和LLM回答压缩成概要后放到context中。 其中，总结概要的过程又是一个独立的LLM任务（或另一个精心设计的系统）。这样做也可以控制context长度，但是依赖于“概要提取”系统的质量：如果做得好，概要可以保留所有重要信息；如果做得不好，概要可能遗漏重要信息。
- 概要和滑动窗口相结合：同时提供近$K$轮的完整输入输出，以及前$n-K$轮的概要。
- 关键信息结构化提取：相比于概要方法中seq to seq对历史信息做压缩，另一种方法是在context中维护一个结构化的格式（比如json）记录关键信息，每一轮对话时把该这个关键信息列表放在context中提供给LLM，并在每一轮对话结束后更新这一信息列表。
- 与外部数据库对接：不仅仅把关键信息结构存储在context中，而是用一个专门的程序来维护这一结构。这样，这个结构其实已经成为一个外部的历史信息数据库了。可以设计传统算法、调用外部工具，对做处理、提取、筛选、整合等等。也可以用LLM-based的方法来维护数据库。在agent交互过程中，每一轮从数据库中提取信息加入到context中，每次读取LLM的输出后把LLM给出的信息整合到数据库中。实践中，可以同时整合短期对话记录，当前任务历史记录，以及数据库中存储的往期历史记录（类似于人脑工作时的短期记忆、工作记忆以及储存在人脑中的长期记忆）。

### Token Budgeting

一般来说，agent的每一次询问的context会包含：

- system prompt：包括“对问题的基本描述”、“persona设定”、“关于任务的基本示例”等等；
- chat history：历史的交互记录（memory management处理后的）；
- current input：当前这一轮的询问内容；

我们需要做出对“可用token”的严谨的预算。“可用token”是指总的context window的token限制，减去以上这几项必要内容。

分配token时，有一个常用的4-4-2法则：总context window的token限制的40%用于system prompt；40%用于chat history；20%用于当前询问，以及预留空间应对LLM输出的随机性和其它意外情况；

很多时候LLM并不像人类那样需要准确连贯的语法来帮助理解。例如：

```
The meeting is scheduled to take place on Tuesday, April 15th, 2025, at 2:30 PM Eastern Standard Time. The meeting will be held in Conference Room B on the 3rd floor of the headquarters building.
```

```
Meeting: Tue 4/15/25, 2:30PM EST
Location: HQ, 3rd floor, Conf Room B
```

这两种表述方法可能对LLM来说效果并无大异，甚至后一种方法效果更好。但是，实践中我们并不需要刚开始设计prompt时就处处小心prompt的预算。一般的做法是：总是先用最自然的方式写prompt，然后通过实验调试，以优化为目的一点一点精简prompt。

## Multi-Agent System

对于更复杂的任务，我们会需要多个agent，每个agent有自己独立的memory management，不同agent之间有共享的存储记忆的数据库，还需要一个“组织者”来调度众多agent。这就是Multi-Agent System。我们看到，这整个系统是非常“拟人”的，就好像一个大公司需要分为不同的部门，每个部门专门负责一部分工作那样。

组织者(orchestrator)的任务是把总任务分解为子任务，调度各个agent的工作顺序和工作时间，处理agent间的冲突，监管当前工作进度，从agent处获取信息，整合信息做出下一步决策。组织者程序可以是rule-based的传统程序，也可以是LLM-driven的程序，或者是传统与LLM结合的程序。

Shared memory数据库的维护可能包括：历史工作记录，知识档案与资料档案库，当前任务状态以及各个agent的工作进度等等。正如我们之前提到的，shared memory之所以重要，是因为它提供了“context”以外的信息存储空间，同时也是agent之间互相沟通的纽带。

各个Agent本身也是一个Multi-Agent System，就好像公司的部门下面又分为子部门，子子部门等等。这取决于任务的复杂性。

### Paradigm

System的框架设计往往是有范式可循的：

- 队列。这是最简单的系统框架，适用于可以被按顺序分解为多个相继步骤的任务，每个agent获取之前agent留下来的信息，完成自己的工作，交给下一个agent。
- 并行。如果多个agent的任务之间相互独立，可以采用并行的方法提高效率。
- 反馈。在若干agent完成它们当前的任务后，把结果反馈给某个agent，该agent对结果做评估（rule-based或LLM-driven），如果发现问题，则返回重做。和prompt engineering中的verification loop很像，只是这里的原子组件是agent。
- 选择+执行。组织者从若干可以调用的agent中选择一个最适合当前任务的，由该agent完成任务。
- 执行+选择。组织者同时要求多个agent完成当前工作，然后从众多结果中选择一个最好的。该选择的过程可以由组织者自行评估，也可以要求agent之间互相进行多轮的辩论(debate)。

在优化系统表现时，需要着重注意以下几点：

- 组织者要明确地把总任务的分解为子任务，系统设计者本身要对该分解过程了然于胸。
- 要清晰的定义各个agent的任务，系统设计者本身要对如何完成每个agent的任务了然于胸。同时，每个agent需要明确自身的身份，明确自身工作的输入输出格式，明确工作内容的要求和限制。
- 要注意处理agent工作出错或者失败的情况，不要让单个节点的错误扩散到全局。（这往往意味着要有反馈机制，并在无法挽救错误时抛出系统异常）

我们可以期待未来还会发展出更多Agent系统的范式：比如LLM自行设计agent系统；很好的支持人类输入，支持人类与agent同时交互的系统；由长期运行并自我更新的agent参与的系统；等等。

### Prompt Programming

传统的软件工程是对众多确定性程序的组织，这些确定性程序用的是一种完全精确的程序语言，本质上是一种计算，是既有逻辑系统上的确定程序。逻辑是重要的工具，但人类的“智能”（也即上文提到的“认知过程”）不仅限于逻辑，还包括重要的启发与直觉。有了LLM之后，软件工程将由传统的logic向“logic+heuristics”转变。从context engineering的角度看， 这种转变的关键就在于对LLM的prompting。在这套新方法中，prompting不再是一个独立的询问任务，其本身成为了一个programming的基本组件。

人们可以提前预设好各式各样的prompt模板，“模板”中特定的词句或段落是“留空”的，这就相当于传统编程中的“传入参数”。例如，下面这个模板专门用来做段落摘要：

```
## 任务
请你对给定的文本做摘要。
## 文本内容
{参数1}
## 要求
1. 不超过{参数2}字
2. {参数3}
## 样例
{参数4}
{参数5}
## 你的输出
```

同理，还可以有别的模板，专门负责“重述问题”、“思考与分析”、“制定策略”、“评估质量”等等。在确定了prompt模板以后，只需用一个传统程序（比如python）接受参数作为输入，输出填入参数以后的prompt。于是，调用LLM这个过程本身被封装为了一次function call，和传统编程完全一致。由此可见，这些需要“智能”的任务也可以被封装为传统的函数，我们不妨也把这样的函数调用看作一种外部工具调用，只不过它们是具有“认知功能”的智能的外部工具(称为cognitive tools)。

有了这些cognitive tools函数之后，context engineering的组织程序就可以像传统程序那样来实现。例如：

```
function Summarize(content, word_limit, constraints, examples, history){
    for(i = 1; i <= N; ++i){
        summary = GetSummary(content, word_limit, constraint, examples, history);
        if(JudgeSummary(summary) == 1){
            result = summary;
            break;
        }
        history = MergeHistory(history, summary)
    }
    return result;
}
```

可以看到，这段程序在组织上非常简明，和传统程序一样可读。但是它通过调用congitive tools，完成了传统程序不可能完成的任务。在上面的程序中，LLM-Prompt已经内化为传统函数的一个组件。在这里，prompt engineering不只是手写文档，而是与传统编程相辅相成。

在着手实践这样的系统时：

- 可以从最简单的设计出发，incremental地增加机制。
- 在调试时，一般会单独调试每一次function call(LLM call)。通过调整prompt，充分评估这一function的表现，令人满意了以后，就把这个function封装起来。
- 要极其明确地定义各个组件之间交互的格式，一般而言，能结构化就尽量结构化(structure everything!)

当然，prompt programming也不仅限于传统程序，就好像现在已经很少有人手写传统程序而是通过自然语言prompting来让LLM帮我们写程序，这称为meta-programming。prompt programming也可以由LLM来写组织程序，人类只需告知LLM具体要求是什么即可。这只是实现的手段不同而已。

可以期待，未来prompt programming的发展将会非常普及：可能出现prompt模板的标准库；可能出现专门用于prompt programming的程序语言；可能出现专门用于prompt programming的图形化界面；能够自动反馈调整prompt模板的机制；...

### System Evaluation

在设计system时，一个很重要的方法是：设计者要经常评估当前系统的表现。这种评估需要是多维度的。常用的一些指标包括：

- 端到端质量评估：完全正确；基本正确；格式正确但有错误；完全错误；...
- 效率：token消耗；时间消耗；
- 鲁棒性：Runtime Error概率；边界情况处理情况；
- 自我修正表现：系统的verification loop是否在有效减少错误；
- ...

## Reference

[1] Context-Engineering, https://github.com/davidkimai/Context-Engineering/blob/main/README.md











