from gmpy2 import invert
import sys
value = [2,3,5,7,11]
result = [0]*5
def power(a,b,c):
    x = 1
    y = a
    while b>0:
        if b%2 == 1:
            x = (x*y)%c
        y = (y*y)%c
        b = int(b/2)
    return x%c
private_key = int(sys.argv[1])
q = int(sys.argv[2])
c1 = int(sys.argv[3])
c2 = int(sys.argv[4])
# private_key = 120482
# q = 133117
# c1 = 35528
# c2 = 94116

s = power(c1,private_key,q)
s_1 = invert(s,q)
ans = (c2*s_1)%q
for i in range(5):
    while ans % value[i] == 0:
        result[i] = result[i] + 1
        ans /= value[i]
print(result)
    
    


