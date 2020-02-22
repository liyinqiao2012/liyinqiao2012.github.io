---
layout:     post
title:      NiuTensor系统中对类Unix系统中兼容性的测试
subtitle:   可执行程序以及库文件的兼容性测试与分析
date:       2020-02-22
author:     Joooooey
header-img: img/post-unix.jpeg
catalog: 	 true
tags:
    - Unix
    - Linux
    - macOS
    - 兼容性
    - NiuTensor
---

# NiuTensor系统中对类Unix系统中兼容性的测试
## 前言
由于Linux和macOS均为类Unix系统，因此很多人对二者在可执行程序以及动态链接库上的兼容性非常好奇，因此本文将分别从可执行程序以及动态链接库两个角度对类Unix系统中的兼容性进行测试，同时对其进行解释。
### NiuTensor系统可执行程序的生成与使用
#### 可执行程序的生成
可执行程序的生成非常简单，仅需根据编译环境对几个开关进行设定即可。
- `OnMac`：操作系统是否为MacOS，如是则置为1，不是置为0（默认0）:
	```Makefile
	# 0 - on Windows or Linux platform
	# 1 - on Macintosh platform
	OnMac = 1
	```
- `USE_CUDA`：操作环境中是否安装[CUDA](https://developer.nvidia.com/cuda-toolkit)，如是则置为1，不是置为0（默认0）。需要注意的是如果已安装CUDA且希望在编译过程中使用，需检查系统中所安装CUDA的根目录是否同`CUDA_ROOT`变量中指定路径一致，如不一致需手动修改`CUDA_ROOT`变量，同系统中保持一致：
	```Makefile
	# 0 - use CPU 
	# 1 - use GPU
	USE_CUDA = 1
	# modify this path if neccessary
	CUDA_ROOT = /usr/local/cuda-9.0
	CUDA_LIB_DIR = $(CUDA_ROOT)/lib64
	CUDA_INCLUDE = $(CUDA_ROOT)/include
	```
- `USE_MKL`：操作环境中是否安装[MKL](https://software.intel.com/en-us/mkl)数学运算库，如是则置为1，不是置为0（默认0）。需要注意的是如果已安装MKL且希望在编译过程中使用，需检查系统中所安装MKL的根目录是否同`MKL_ROOT`变量中指定路径一致，如不一致需手动修改`MKL_ROOT`变量，同系统中保持一致。`INTEL_ROOT`为MKL路径的父目录，需一同检查：
	```Makefile
	# use MKL 
	USE_MKL = 1
	INTEL_ROOT = /opt/intel
	MKL_ROOT = /opt/intel/mkl
	MKL_LIB_DIR = $(MKL_ROOT)/lib/intel64/
	MKL_INCLUDE = $(MKL_ROOT)/include
	```
- `USE_OPENBLAS`：操作环境中是否安装[OpenBLAS](https://www.openblas.net)数学运算库，如是则置为1，不是置为0（默认0）。需要注意的是如果已安装OpenBLAS且希望在编译过程中使用，需检查系统中所安装OpenBLAS的根目录是否同`OPENBLAS_ROOT`变量中指定路径一致，如不一致需手动修改`OPENBLAS_ROOT`变量，同系统中保持一致：
	```Makefile
	# use OpenBLAS
	USE_OPENBLAS = 1
	OPENBLAS_ROOT = /opt/OpenBLAS
	OPENBLAS_LIB_DIR = $(OPENBLAS_ROOT)/lib
	OPENBLAS_INCLUDE = $(OPENBLAS_ROOT)/include
	```
完成之后执行正常执行`Make`命令即可，系统打屏如下，
```
Start building ...
Start building library
Finish building library

Finish building executable file
Start building executable file

Finish building ...

Skip building dynamic link library
Building executable file: ./bin/NiuTensor.CPU
```
完成之后将会在项目目录下的bin目录下将会生成NiuTensor.CPU可执行程序。
#### 可执行程序的使用
可执行程序的使用仅需执行`./bin/NiuTensor.CPU -test`即可，该指令将进行单元测试，如无问题最后将提示，
```
OK! Everything is good!
```
### NiuTensor系统动态链接库的生成与使用
#### 库文件的生成
这部分同样非常简单，除去`OnMac`、`USE_CUDA`、`USE_MKL`、`USE_OPENBLAS`开关的设定之外（参考上一章节），仅需要将Makefile文件中的`dll`变量的开关置于1即可：
```Makefile
# whether to generate dll
dll = 1
```
完成之后执行正常执行`Make`命令即可，系统打屏如下，
```
Start building ...
Start building library
Finish building library

Finish building executable file
Start building executable file

Finish building ...

Building dynamic link library: ./lib/libNiuTensor.CPU.so
Building executable file: ./bin/NiuTensor.CPU
```
完成之后将会在项目目录下的lib目录下将会生成libNiuTensor.CPU.so库文件。
通过Makefile文件中的描述可知，对于库文件的编译实际上是将NiuTensor中核心的操作以及各个操作的单元测试集成进来，刨除在外的是Main.cpp文件(`$(MAIN_FILE)`)。
```Makefile
ifeq ($(dll), 1)
	@echo "Building dynamic link library: $(NIUTRANS_DLL)"
	@$(CXX) -shared -Wall $(CXXFLAGS) $(MACRO) $(LDFLAGS) $(OBJS) $(DEPLIBS) -o $@
else
	@echo "Skip building dynamic link library"
endif
```
#### 库文件的使用
如前文所说，编译生成的库文件中包含了全部NiuTensor中的张量操作以及对应的单元测试，那么对于库文件的测试这里我们直接使用Main.cpp文件与库文件进行联合编译，命令为`g++ -o ./bin/NiuTensor.CPU ./source/Main.cpp ./lib/libNiuTensor.CPU.so -std=c++11`，即可在bin目录下生成可执行程序。
执行`./bin/NiuTensor.CPU -test`将进行单元测试，如无问题最后将提示，
```
OK! Everything is good!
```
注意：上述过程中生成的可执行程序只能在编译路径下进行执行，否则将提示找不到库文件。该问题暂时未找到合适的方案解决，如果有合适的方法后续将再更新。
## 类Unix系统兼容性测试
类Unix系统我们这里主要测试的是Linux系统以及macOS下可执行程序以及动态链接库的兼容性情况。
### 可执行程序兼容性
实验方式为分别在Linux和macOS上按照前文所说生成对应平台的可执行程序，然后将其直接放到另外的操作系统中尝试执行。
执行结果如下：
- 在Linux平台执行macOS程序：
	```
	-bash: ./dllTest: 无法执行二进制文件
	```
	无法正常执行。
- 在macOS平台执行Linux程序：
	```
	zsh: exec format error: ./NiuTensor.CPU
	```
二者均无法正常执行。
但由于macOS默认使用[LLVM](https://llvm.org)进行编译，而Linux平台使用的是[GCC](http://gcc.gnu.org)，是否是由于编译器的差异导致无法运行？为验证此猜想，我们进行一个简单的实验。
我们在macOS平台下使用GCC对NiuTensor的可执行程序进行编译，再去Linux平台下进行测试，结果同上，依旧会报`无法执行二进制文件`的错误。
### 动态链接库兼容性
同可执行程序兼容性的测试方法类似，我们将Linux和macOS上生成的动态链接库libNiuTensor.CPU.so文件互换，然后再尝试将Main.cpp文件同动态链接库一起进行编译。
执行结果如下：
 - 在Linux平台使用macOS下生成的动态链接库进行编译：
	```
	./lib-mac/libNiuTensor.CPU.so: file not recognized: 不可识别的文件格式
	collect2: 错误：ld 返回 1
	```
	无法正常编译。
- 在macOS平台执行Linux程序：
	```
	ld: symbol(s) not found for architecture x86_64
	clang: error: linker command failed with exit code 1 (use -v to see invocation)
	```
	无法正常编译。
## 不兼容的解释
### 可执行程序的不兼容
由于不同操作系统下可执行程序的文件格式以及API上的差异，不同操作系统下的二进制文件往往不兼容。
#### 可执行程序的文件格式
程序编译好的可执行程序实际上可以理解为一个执行包，其中不仅包括编译出的二进制机器指令（[代码段](https://zh.wikipedia.org/wiki/%E4%BB%A3%E7%A0%81%E6%AE%B5)），还包括[数据段](https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E6%AE%B5)、[BBS段](https://zh.wikipedia.org/wiki/BSS%E6%AE%B5)（存放程序中未初始化的全局变量）等，而各个操作系统中对可执行程序中各个部分的设定以及组织形式各有不同，其中Linux平台中广泛使用EFL格式进行封装，macOS采用Mach-O，WIndows平台使用PE。虽然各个操作系统对于封装方式有各自的策略，但由于其中记录的核心内容几乎相同，因此存在很多第三方软件可以将某些操作系统上的软件迁移到其他操作系统中运行，如大名鼎鼎的[Wine](http://www.winehq.org/)，可以将Windows平台的软件迁移到类Unix平台中进行运行。
对于可执行程序的文件格式，Wikipedia上针对各自支持的特性进行了[详细对比](https://en.wikipedia.org/wiki/Comparison_of_executable_file_formats "可执行程序的文件格式")。
#### 操作系统API
操作系统API指的是操作系统提供给应用程序调用使用的接口，使得开发者无需关注操作系统底层操作细节，可以方便快捷地使用。同时API仅对应用程序对功能调用模式进行限定，并不涉及内部实现，因此可以通过操作系统层面的更新持续对应用程序的执行效率以及运行模式进行优化，在保证接口不变的情况下可以较好地兼容旧版程序。对于Windows操作系统而言，其主要使用的API为[Windows API](https://docs.microsoft.com/zh-cn/windows/)，其中包括了基础服务、图形设备接口等操作接口。而对于Unix的操作系统，则采用[POSIX](http://get.posixcertified.ieee.org/)，同时类Unix的操作系统往往也会对该接口进行兼容，如常见的Linux以及macOS。由于类Unix平台在程序开发人员中的受欢迎程度较高，很多优秀软件往往更加倾向于基于POSIX接口进行开发，因此微软为了提升Windows平台的竞争力，同样也在逐步完善对POSIX接口的支持。
对于不同操作系统上的接口差异，最直观的可以从我们在编写C++程序时为不同操作系统的适配感受得到。下面的这个代码来自NiuTensor系统中XMem.h中的片段，其为保证在Linux、macOS以及Windows平台的顺利执行，通过宏定义的方式适配了不同平台所使用的头文件。
```cpp
#ifdef __APPLE__
#include <sys/types.h>
#include <sys/sysctl.h>
#elif WIN32
#include <windows.h>
#else
#include <unistd.h>
#endif
```
从上述两点中我们可以看到，不同平台编译生成的可执行程序受限于文件格式以及操作系统API的差异，很难直接跨平台进行执行。而对于具有跨平台需求的项目开发而言，我们需要在编码过程中就将跨平台的问题考虑进来，如在我我们的NiuTensor开源项目之中就已经针对常见的操作系统API进行了适配。这使得我们虽然依旧受限于可执行程序文件格式的问题难以直接将使用其他其他平台上编译的二进制程序，但我们依旧可以通过编译安装的方式使软件在不同操作系统中运行。
### 动态链接库的不兼容
谈到动态链接库我们首先就需要明确的问题就是啥是库文件。我们经常会在编程过程中听到动态链接库和静态链接库，实际上二者存在的主要目的都是为了减少开发人员反复“造轮子”的过程。开发人员将相对底层的功能打包成库文件供其他人员直接调用，降低整个系统的开发难度，同时也有为系统中各个模块解耦的功效，对于大规模项目的开发非常有帮助。程序的编译过程我们都知道包括预编译、编译、汇编代码生成以及链接，而我们在库文件的使用过程实际上就是在链接过程中去插入已经编译好的库，整个过程如下：

![](https://tva1.sinaimg.cn/large/0082zybply1gc50qbgsoyj30fe07b74x.jpg)

对于静态库而言，我们可以直观地理解为它就是我们编译出来的中间文件（未链接），而将其同其他文件一同链接的时候会把库中的全部内容集成进可执行文件中，因此理论上来说，先将一部分代码编译为静态链接库，再与其他代码一同链接为最后的可执行文件同直接将所有代码编译链接得到的文件是完全相同的。这就导致如果我们希望对项目中的静态库进行更新，那么最终的可执行文件我们需要重新进行编译，相对而言使用起来稍显不便。而动态链接库则是针对该问题进行了解决，其在链接过程中是不会将代码直接加入到可执行程序中的，而是在运行的时候动态载入（因此叫做动态链接库）。由于这个特性，动态链接库得到的可执行程序本身大小相对静态库得到的会更小（由于部分代码在动态库中未载入），同时对于库文件的更新则不需要对可执行程序进行重新编译。但与此同时动态库也存在一个弱点在于，可执行程序在发布的时候需要连连同库文件一同交付给用户，否则则会出现找不到库的问题。
整体来说动态库和静态库两者各有各自的优势，静态库好在编译得到的可执行程序与编译中使用的库文件不在有关联，移植起来非常方便。而动态库优势在于对底层库文件的升级更加灵活，无需用户重新编译。
而类似于可执行程序，不论是动态库还是静态库，其在不同的操作系统上依旧存在可执行文件格式以及操作系统API的问题，因此简单的将其他平台的库文件应用到第三方的操作系统中同样不能正常链接，会出现之前实验中提到的类似`不可识别的文件格式`之类的问题。
## 后记
本文主要是对可执行程序以及库文件跨平台兼容性进行了实验以及讨论，查阅了相关资料并对可执行文件有了更深层次的理解。分享出来供大家参考，有问题的话欢迎在留言区评论。
### 一些感想
> 不要做爱迪生，他是发明家，我们要做的是科学家，用科学的方式和手段去了解这个世界。
> ——肖老
> 
 ![](https://tva1.sinaimg.cn/large/0082zybply1gc55a03l1pj308c06tjrz.jpg)

这篇文章主要是我目前在对NiuTensor项目跨平台兼容性方面做测试过程的一个总结，前半部分是几个小实验，后半部分是对实验结果的分析。整体下来实际上我觉得做事的过程逻辑还是有些问题，我们总习惯通过实验去验证，而验证之前实际上自己并没有对问题有深入的了解和思考，最终可能看到个结果就放在那了，这导致以后出现了类似的问题实际上依旧丈二和尚摸不着头脑，帮助不大。就二进制文件以及库文件兼容性的问题实际上如果我们预先就查阅好相关资料之后，我们会发现简单地迁移根本不可能成功链接或运行的。有了这个结论之后再去实验可能会更符合科研的流程。肖老一直说的不要做爱迪生也是同样的道理，自勉！
### 附上过程中使用到的一些工具
#### ldd/otool工具
[ldd](https://linux.die.net/man/1/ldd)和[otool](https://www.unix.com/man-page/osx/1/otool/) 工具是分别为Linux平台和macOS平台提供的分析可执行程序依赖库的工具，二者均能够列出可执行程序或共享库所依赖的函数库。
ldd全称List Dynamic Dependencies，中文意思列出动态库依赖关系，使用方法为`ldd NiuTensor.CPU`，其中NiuTensor.CPU为可执行文件。执行结果如下，
```
$ldd NiuTensor.CPU
linux-vdso.so.1 =>  (0x00007fff4dcce000)
libdl.so.2 => /lib64/libdl.so.2 (0x00007f0c60509000)
libpthread.so.0 => /lib64/libpthread.so.0 (0x00007f0c602ed000)
libstdc++.so.6 => /lib64/libstdc++.so.6 (0x00007f0c5ffe6000)
libm.so.6 => /lib64/libm.so.6 (0x00007f0c5fce4000)
libgcc_s.so.1 => /lib64/libgcc_s.so.1 (0x00007f0c5face000)
libc.so.6 => /lib64/libc.so.6 (0x00007f0c5f70d000)
/lib64/ld-linux-x86-64.so.2 (0x00007f0c6070d000)
```
其中包括三列内容，分别代表程序所依赖的库名称、系统根据需求所提供的库位置、库加载的起始地址。
而otool则为macOS平台提供的工具，全称为Object File Displaying Tool，主要用来对编译出的目标文件进行分析，该工具在[XCode](https://developer.apple.com/xcode/)中进行集成。otool工具在命令中指定-L参数即能够对可执行程序中调用的依赖库进行分析，`otool -L NiuTensor.CPU`，运行后结果如下，
```
NiuTensor.CPU:
/usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 1281.0.0)
/usr/lib/libc++.1.dylib (compatibility version 1.0.0, current version 800.7.0)
```
其中包括的内容同ldd命令展示的类似，包括系统提供的库信息，同时补充了对应库版本兼容的情况供开发者参考。
## 注意
本文使用的代码版本为_ gitlab内部测试版_（版本SHA为ca1f18435adfe154c7fbe1a7193d3db64c8fee0a），但本文所进行的测试理论上同代码版本无直接关联，使用[github](https://github.com/NiuTrans/NiuTensor)上的版本理论上具有相同现象，但作者并未直接测试，如有问题可及时在评论区讨论，谢谢！
## 参考资料
- [知乎-为什么不同系统不能兼容同一个已编译的可执行二进制文件？](https://www.zhihu.com/question/22672994)
- [知乎-为何 Linux 的系统 API 相比 Win32 到处是缩写？有何优劣? 造成两者差别的原因是什么？](https://www.zhihu.com/question/59318669)
- [简书-POSIX解决什么问题](https://www.jianshu.com/p/7a17b34e05ee)
- [知乎-POSIX是什么标准？为什么Windows也要支持他？](https://www.zhihu.com/question/21048638)
- [WIkipedia-Windows API](https://zh.wikipedia.org/wiki/Windows_API)
- [Wikipedia-可移植操作系统接口](https://zh.wikipedia.org/wiki/%E5%8F%AF%E7%A7%BB%E6%A4%8D%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3)
- [知乎-Linux 中的动态链接库和静态链接库是干什么的？](https://www.zhihu.com/question/20484931)
- [CSDN-Mac OS X (10.9.1)下创建和使用动态链接库的方法](https://blog.csdn.net/haihsl123456789/article/details/43527243)
- [个人博客-dylib浅析](https://makezl.github.io/2016/06/27/dylib/)
- [Wikipedia-动态链接库](https://zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E9%93%BE%E6%8E%A5%E5%BA%93)
- [Wikipedia-Ldd(Unix)](https://zh.wikipedia.org/wiki/Ldd_(Unix))
- [Linux Tools Quick Tutorial-ldd 查看程序依赖库 ](https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/ldd.html)
- [manpagez-man otool](https://www.manpagez.com/man/1/otool/)
- [简书-otool 一些用途](https://www.jianshu.com/p/fc67f95eee41)
