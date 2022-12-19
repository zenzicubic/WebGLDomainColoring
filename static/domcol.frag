#define PI 3.141592
#define TAU 6.283187

const vec2 ONE = vec2(1., 0.);
const vec2 I = vec2(0., 1.);
const vec3[4] cols = vec3[](vec3(0.5), vec3(0.5), vec3(1.), vec3(0., 0.33, 0.67));

out vec4 col;

uniform float scale;
uniform vec2 res;
uniform vec2 center;

// Complex functions
float cabs(vec2 z) { return length(z); }
float carg(vec2 z) { return atan(z.y, z.x); }
vec2 conj(vec2 z) { return vec2(z.x, -z.y); }
vec2 itimes(vec2 z) { return vec2(-z.y, z.x); }

vec2 cis(float t) { return vec2(cos(t), sin(t)); }
vec2 cmul(vec2 a, vec2 b) { return mat2(a.x, a.y, -a.y, a.x) * b; }
vec2 cinv(vec2 z) { return conj(z) / dot(z, z); }
vec2 cdiv(vec2 a, vec2 b) { return cmul(a, cinv(b)); }

vec2 cexp(vec2 z) { return exp(z.x) * cis(z.y); } // exponentials, powers, roots, logarithms
vec2 clog(vec2 z) { return vec2(log(cabs(z)), carg(z)); }
vec2 cpowf(vec2 z, float n) {
	float rN = pow(cabs(z), n);
	float nT = n * carg(z);
	return rN * cis(nT);
} 
vec2 cpowc(vec2 a, vec2 b) { return cexp(cmul(a, clog(b))); }
vec2 csqrt(vec2 z) { return cpowf(z, 0.5); }
vec2 cnthroot(vec2 z, float n) { return cpowf(z, 1./n); }

// Trig functions
vec2 ccos(vec2 z) { return vec2(cos(z.x)*cosh(z.y), -sin(z.x)*sinh(z.y)); }
vec2 csin(vec2 z) { return vec2(sin(z.x)*cosh(z.y), cos(z.x)*sinh(z.y)); }
vec2 ctan(vec2 z) { return cdiv(ccos(z), csin(z)); }

vec2 csinh(vec2 z) { return 0.5 * (cexp(z) - cexp(-z)); } // hyperbolic
vec2 ccosh(vec2 z) { return 0.5 * (cexp(z) + cexp(-z)); }
vec2 ctanh(vec2 z) { return cdiv(csinh(z), ccosh(z)); }

vec2 ccot(vec2 z) { return cinv(ctan(z)); } // reciprocal
vec2 ccsc(vec2 z) { return cinv(csin(z)); }
vec2 csec(vec2 z) { return cinv(ccos(z)); }
vec2 ccoth(vec2 z) { return cinv(ctanh(z)); }
vec2 ccsch(vec2 z) { return cinv(csinh(z)); }
vec2 csech(vec2 z) { return cinv(ccosh(z)); }

#define remap(t) 0.5 + 0.5 * fract(t)

vec2 f(vec2 z) {
	return cexp(cinv(z));
}

vec3 getColor(float t)
{
	// Color ramp function
	return cols[0] + cols[1] * cos(TAU * (cols[2] * t + cols[3]));
}

vec3 domcol(vec2 z) 
{
	// Calculate the function and its angles and magnitudes
	vec2 v = f(z);
	float l = log(cabs(v));
	float a = carg(v);
	float t = (PI + a) / TAU;

	// Calculate the brightnesses
	float lBrt = remap(l);
	float aBrt = remap(a);

	return getColor(t) * lBrt * aBrt;
}

void main() {
	// Generate the plot
	vec2 uv = (2. * gl_FragCoord.xy - res.xy) / res.y;
	vec2 m = scale * uv + center;
	
	col = vec4(domcol(m), 1.);
}