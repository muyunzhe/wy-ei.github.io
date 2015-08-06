---
layout: post
category: software
title: QQ空间留言分析报告
tag: 数据分析
---

## 起因

闲来无事，翻开QQ空间，发现QQ空间已经不活跃了，觉得QQ空间已死。发现有人喜欢在留言板里面写东西，而不是发表说说，于是我想了个办法可以帮我一键获取当日所有好友的新留言，这样就可以很快地看到新添加的留言了（这个举动似乎有些不太好，但是管他呢，这确实很有趣）。

后来想为什么不把所有留言拿下来做个分析呢？于是我获取了自己202个好友的十万余条留言，对其进行了简单的分析，下面是分析结果。

## 样本介绍

本次分析的数据来自202人的一共102510条留言。这202人中有80%为90和我同级的学生，样本能在一定程度上代表90后。

## 留言量随时间的变化情况

**先看看这些年留言量的变化情况：**

![留言量随年度的变化](/images/blog/2015/qzone/comment_year.png)

<!--more-->

可以看出从初中起开始有人玩空间而且人数越来越多，到了2013年也就是大学一年级达到鼎盛事情，后来渐渐丧失了热度，近两年的留言量急速减少，看来空间是真的不如以前活跃了。

**再来看看各月的留言量有什么变化：**

![留言量随月份的变化](/images/blog/2015/qzone/comment_month.png)

从图中可以看出，下半年的留言量偏多。在寒暑假期间都有不同幅度的上涨。**那么人们最喜欢在一天的什么时段给别人留言呢？看下图:**


![一天各个时段的留言量](/images/blog/2015/qzone/comment_day.png)

从图上可以看出人们更偏爱在晚上给好友留言，这一点应该和我们的想象是一致的。不过还有人在凌晨两三点给别人留言，这真让人感动。看了留言的时间分布情况后，来吧关注焦点转移到留言数目上吧。

## 留言量分布情况

本次收集到了202位好友的102510条留言，平均每个人有507条留言，下面是留言量分布散点图。

![留言量散点图](/images/blog/2015/qzone/comment_count.png)

可以看出大多数人的留言数都在500条以下，但是有几个人的留言量明显偏高（居然超过了两万），我分析其中可能存在大量的重复，于是对重复比例做了分析如下：

![重复留言所占比例](/images/blog/2015/qzone/repeat.png)

在这102510条留言中有37.2%(38083条)留言是重复的。去掉重复后得出留言量分布散点图如下：

![去重复后的留言量散点图](/images/blog/2015/qzone/comment_count_uniq.png)

这下最多的两万多条留言仅仅剩下了6000多条了（可见踩的真够狠的）。

## 留言的内容

**下面来看看大家的留言都说了些什么**

对10万余条留言进行了整理后得出了以下高频留言:

![高频留言](/images/blog/2015/qzone/mostcomment.png)

可以看到大家更喜欢说晚安，而且很喜欢说”呵呵“，”哈哈“，”嘿嘿“这几个词语，而且踩空间真的很流行。另外其中还有13%(5139条)的留言是单个表情，那就来看看大家最喜欢使用什么表情吧！

我从留言中出现的16883个表情中得出了前十位，频率由高到底高依次是：

<img style="display: initial;width: initial;" src="http://ctc.qzs.qq.com/qzone/em/e113.gif" />
<img style="display: initial;width: initial;" src="http://ctc.qzs.qq.com/qzone/em/e163.gif" />
<img style="display: initial;width: initial;" src="http://ctc.qzs.qq.com/qzone/em/e100.gif" />
<img style="display: initial;width: initial;" src="http://ctc.qzs.qq.com/qzone/em/e176.gif" />
<img style="display: initial;width: initial;" src="http://ctc.qzs.qq.com/qzone/em/e178.gif" />
<img style="display: initial;width: initial;" src="http://ctc.qzs.qq.com/qzone/em/e121.gif" />
<img style="display: initial;width: initial;" src="http://ctc.qzs.qq.com/qzone/em/e112.gif" />
<img style="display: initial;width: initial;" src="http://ctc.qzs.qq.com/qzone/em/e152.gif" />
<img style="display: initial;width: initial;" src="http://ctc.qzs.qq.com/qzone/em/e120.gif" />
<img style="display: initial;width: initial;" src="http://ctc.qzs.qq.com/qzone/em/e104.gif" />

我最喜欢使用的<img style="display: initial;width: initial;" src="http://ctc.qzs.qq.com/qzone/em/e128.gif" />居然没有上榜，有点意外。

在分析「生日快乐|生快」这个高频词语的时候我知道了某些人的生日。

![](/images/blog/2015/qzone/happy_birthday.png)



我还发现有很多人**喜欢给自己留言**，于是对这种情况进行了简单分析，得出以下结果：

202人中有111人给自己留过言，102510条留言中有3416 条留言是自己给自己留的。

后来我对这3416条留言进一步的分析，它们句句充满正能量，看了之后深受感触。另外，抱歉！从中我看出了不少人的曾经的心事。

下面摘抄几句放在这里：（虽然有些侵犯权，不过～ 侵权就侵权吧，不服你打我呀）

+ 何以琛说过：“你以后会明白，世界里曾经有一个人出现过，其他人的出现都会变成将就~”
+ 别低头，王冠会掉。
+ 高雅的人，看背影就知道;奋进的人，听脚步就知道;和善的人，看笑脸就知道;自信的人，看眼神就知道！
+ 累就对了，安逸是留给死人的，早安！
+ 废话我不说，好好整！
+ 我不要颓废，神啊，给我力量吧…
+ ......

还有人真的很逗，比如：

+ 踩死我自己……
+ 上课不能睡觉…
+ 我就一SB

## 总结

这次分析的样本比较少，起初并没有做分析的打算于是只是简单地获取了自己好友的留言，以后再玩的话，可以获取朋友的朋友，及朋友朋友的朋友的信息，奈何计算机太渣，网速更渣，就这10万条留言程序就跑了40多分钟<img style="display: initial;width: initial;" src="http://ctc.qzs.qq.com/qzone/em/e127.gif" />。*本次分析完全是好奇使然，如果对此任何人感到不悦，请告诉我。*


* *本次分析使用了nodejs，mysql，c，grep，sort，uniq，wc 等工具，图表由 google sheets 生成。*

