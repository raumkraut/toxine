#define DEBUG
/* opus stuff. TODO: figure out what this stuff means and if other defines would be better */
#define OPUS_BUILD
#define VAR_ARRAYS
/* libsodium stuff: */
#define crypto_scalarmult_curve25519 crypto_scalarmult_curve25519_ref
#define crypto_scalarmult_curve25519_base crypto_scalarmult_curve25519_ref_base
