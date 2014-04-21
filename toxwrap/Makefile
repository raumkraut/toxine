TOXCORE_SOURCES= 															\
	toxcore/tox.c															\
	toxcore/assoc.c 														\
	toxcore/friend_requests.c												\
	toxcore/LAN_discovery.c 												\
	toxcore/Messenger.c 													\
	toxcore/network.c       												\
	toxcore/onion.c         												\
	toxcore/ping.c        													\
	toxcore/TCP_server.c													\
	toxcore/util.c															\
	toxcore/DHT.c															\
	toxcore/group_chats.c													\
	toxcore/Lossless_UDP.c													\
	toxcore/net_crypto.c													\
	toxcore/onion_announce.c												\
	toxcore/onion_client.c													\
	toxcore/TCP_client.c

LIBSODIUM_SOURCES=																			\
	libsodium/crypto_auth/crypto_auth.c														\
	libsodium/crypto_auth/hmacsha256/auth_hmacsha256_api.c                                  \
	libsodium/crypto_auth/hmacsha256/ref/hmac_hmacsha256.c                                  \
	libsodium/crypto_auth/hmacsha256/ref/verify_hmacsha256.c                                \
	libsodium/crypto_auth/hmacsha512256/ref/hmac_hmacsha512256.c                            \
	libsodium/crypto_auth/hmacsha512256/ref/verify_hmacsha512256.c                          \
	libsodium/crypto_auth/hmacsha512256/auth_hmacsha512256_api.c                            \
	libsodium/crypto_shorthash/siphash24/ref/shorthash_siphash24.c                          \
	libsodium/crypto_shorthash/siphash24/shorthash_siphash24_api.c                          \
	libsodium/crypto_shorthash/crypto_shorthash.c                                           \
	libsodium/crypto_generichash/crypto_generichash.c                                       \
	libsodium/crypto_generichash/blake2/ref/generichash_blake2b.c                           \
	libsodium/crypto_generichash/blake2/ref/blake2b-ref.c                                   \
	libsodium/crypto_generichash/blake2/ref/blake2s-ref.c                                   \
	libsodium/crypto_generichash/blake2/generichash_blake2_api.c                            \
	libsodium/crypto_onetimeauth/poly1305/onetimeauth_poly1305_try.c                        \
	libsodium/crypto_onetimeauth/poly1305/onetimeauth_poly1305_api.c                        \
	libsodium/crypto_onetimeauth/poly1305/ref/auth_poly1305_ref.c                           \
	libsodium/crypto_onetimeauth/poly1305/ref/verify_poly1305_ref.c                         \
	libsodium/crypto_onetimeauth/poly1305/onetimeauth_poly1305.c                            \
	libsodium/crypto_onetimeauth/poly1305/53/verify_poly1305_53.c                           \
	libsodium/crypto_onetimeauth/poly1305/53/auth_poly1305_53.c                             \
	libsodium/crypto_onetimeauth/crypto_onetimeauth.c                                       \
	libsodium/crypto_verify/16/ref/verify_16.c                                              \
	libsodium/crypto_verify/16/verify_16_api.c                                              \
	libsodium/crypto_verify/32/verify_32_api.c                                              \
	libsodium/crypto_verify/32/ref/verify_32.c                                              \
	libsodium/crypto_box/curve25519xsalsa20poly1305/box_curve25519xsalsa20poly1305_api.c    \
	libsodium/crypto_box/curve25519xsalsa20poly1305/ref/before_curve25519xsalsa20poly1305.c \
	libsodium/crypto_box/curve25519xsalsa20poly1305/ref/keypair_curve25519xsalsa20poly1305.c\
	libsodium/crypto_box/curve25519xsalsa20poly1305/ref/after_curve25519xsalsa20poly1305.c  \
	libsodium/crypto_box/curve25519xsalsa20poly1305/ref/box_curve25519xsalsa20poly1305.c    \
	libsodium/crypto_box/crypto_box.c                                                       \
	libsodium/crypto_sign/edwards25519sha512batch/sign_edwards25519sha512batch_api.c        \
	libsodium/crypto_sign/edwards25519sha512batch/ref/fe25519_edwards25519sha512batch.c     \
	libsodium/crypto_sign/edwards25519sha512batch/ref/ge25519_edwards25519sha512batch.c     \
	libsodium/crypto_sign/edwards25519sha512batch/ref/sc25519_edwards25519sha512batch.c     \
	libsodium/crypto_sign/edwards25519sha512batch/ref/sign_edwards25519sha512batch.c        \
	libsodium/crypto_sign/crypto_sign.c                                                     \
	libsodium/crypto_sign/ed25519/ref10/ge_sub.c                                            \
	libsodium/crypto_sign/ed25519/ref10/sc_muladd.c                                         \
	libsodium/crypto_sign/ed25519/ref10/ge_p3_dbl.c                                         \
	libsodium/crypto_sign/ed25519/ref10/ge_p1p1_to_p3.c                                     \
	libsodium/crypto_sign/ed25519/ref10/fe_cmov.c                                           \
	libsodium/crypto_sign/ed25519/ref10/ge_scalarmult_base.c                                \
	libsodium/crypto_sign/ed25519/ref10/sign.c                                              \
	libsodium/crypto_sign/ed25519/ref10/ge_p3_to_cached.c                                   \
	libsodium/crypto_sign/ed25519/ref10/open.c                                              \
	libsodium/crypto_sign/ed25519/ref10/ge_frombytes.c                                      \
	libsodium/crypto_sign/ed25519/ref10/fe_0.c                                              \
	libsodium/crypto_sign/ed25519/ref10/fe_add.c                                            \
	libsodium/crypto_sign/ed25519/ref10/ge_precomp_0.c                                      \
	libsodium/crypto_sign/ed25519/ref10/fe_isnonzero.c                                      \
	libsodium/crypto_sign/ed25519/ref10/fe_sq2.c                                            \
	libsodium/crypto_sign/ed25519/ref10/fe_invert.c                                         \
	libsodium/crypto_sign/ed25519/ref10/ge_p3_0.c                                           \
	libsodium/crypto_sign/ed25519/ref10/fe_isnegative.c                                     \
	libsodium/crypto_sign/ed25519/ref10/fe_sub.c                                            \
	libsodium/crypto_sign/ed25519/ref10/ge_madd.c                                           \
	libsodium/crypto_sign/ed25519/ref10/ge_tobytes.c                                        \
	libsodium/crypto_sign/ed25519/ref10/ge_add.c                                            \
	libsodium/crypto_sign/ed25519/ref10/fe_neg.c                                            \
	libsodium/crypto_sign/ed25519/ref10/ge_p1p1_to_p2.c                                     \
	libsodium/crypto_sign/ed25519/ref10/ge_double_scalarmult.c                              \
	libsodium/crypto_sign/ed25519/ref10/fe_mul.c                                            \
	libsodium/crypto_sign/ed25519/ref10/sc_reduce.c                                         \
	libsodium/crypto_sign/ed25519/ref10/fe_copy.c                                           \
	libsodium/crypto_sign/ed25519/ref10/ge_p3_tobytes.c                                     \
	libsodium/crypto_sign/ed25519/ref10/ge_msub.c                                           \
	libsodium/crypto_sign/ed25519/ref10/ge_p2_dbl.c                                         \
	libsodium/crypto_sign/ed25519/ref10/fe_pow22523.c                                       \
	libsodium/crypto_sign/ed25519/ref10/fe_1.c                                              \
	libsodium/crypto_sign/ed25519/ref10/fe_tobytes.c                                        \
	libsodium/crypto_sign/ed25519/ref10/ge_p2_0.c                                           \
	libsodium/crypto_sign/ed25519/ref10/fe_sq.c                                             \
	libsodium/crypto_sign/ed25519/ref10/fe_frombytes.c                                      \
	libsodium/crypto_sign/ed25519/ref10/keypair.c                                           \
	libsodium/crypto_sign/ed25519/ref10/ge_p3_to_p2.c                                       \
	libsodium/crypto_sign/ed25519/sign_ed25519_api.c                                        \
	libsodium/randombytes/randombytes.c                                                     \
	libsodium/randombytes/sysrandom/randombytes_sysrandom.c                                 \
	libsodium/randombytes/salsa20/randombytes_salsa20_random.c                              \
	libsodium/crypto_core/salsa2012/ref/core_salsa2012.c                                    \
	libsodium/crypto_core/salsa2012/core_salsa2012_api.c                                    \
	libsodium/crypto_core/salsa208/core_salsa208_api.c                                      \
	libsodium/crypto_core/salsa208/ref/core_salsa208.c                                      \
	libsodium/crypto_core/salsa20/core_salsa20_api.c                                        \
	libsodium/crypto_core/salsa20/ref/core_salsa20.c                                        \
	libsodium/crypto_core/hsalsa20/ref2/core_hsalsa20.c                                     \
	libsodium/crypto_core/hsalsa20/core_hsalsa20_api.c                                      \
	libsodium/crypto_secretbox/crypto_secretbox.c                                           \
	libsodium/crypto_secretbox/xsalsa20poly1305/secretbox_xsalsa20poly1305_api.c            \
	libsodium/crypto_secretbox/xsalsa20poly1305/ref/box_xsalsa20poly1305.c                  \
	libsodium/crypto_hashblocks/sha512/ref/blocks_sha512.c                                  \
	libsodium/crypto_hashblocks/sha512/hashblocks_sha512_api.c                              \
	libsodium/crypto_hashblocks/sha256/hashblocks_sha256_api.c                              \
	libsodium/crypto_hashblocks/sha256/ref/blocks_sha256.c                                  \
	libsodium/crypto_hash/sha512/hash_sha512_api.c                                          \
	libsodium/crypto_hash/sha512/ref/hash_sha512.c                                          \
	libsodium/crypto_hash/sha256/ref/hash_sha256.c                                          \
	libsodium/crypto_hash/sha256/hash_sha256_api.c                                          \
	libsodium/crypto_hash/crypto_hash.c                                                     \
	libsodium/crypto_stream/xsalsa20/stream_xsalsa20_api.c                                  \
	libsodium/crypto_stream/xsalsa20/ref/stream_xsalsa20.c                                  \
	libsodium/crypto_stream/xsalsa20/ref/xor_xsalsa20.c                                     \
	libsodium/crypto_stream/salsa2012/ref/xor_salsa2012.c                                   \
	libsodium/crypto_stream/salsa2012/ref/stream_salsa2012.c                                \
	libsodium/crypto_stream/salsa2012/stream_salsa2012_api.c                                \
	libsodium/crypto_stream/salsa208/stream_salsa208_api.c                                  \
	libsodium/crypto_stream/salsa208/ref/xor_salsa208.c                                     \
	libsodium/crypto_stream/salsa208/ref/stream_salsa208.c                                  \
	libsodium/crypto_stream/aes128ctr/portable/consts_aes128ctr.c                           \
	libsodium/crypto_stream/aes128ctr/portable/xor_afternm_aes128ctr.c                      \
	libsodium/crypto_stream/aes128ctr/portable/beforenm_aes128ctr.c                         \
	libsodium/crypto_stream/aes128ctr/portable/afternm_aes128ctr.c                          \
	libsodium/crypto_stream/aes128ctr/portable/common_aes128ctr.c                           \
	libsodium/crypto_stream/aes128ctr/portable/stream_aes128ctr.c                           \
	libsodium/crypto_stream/aes128ctr/portable/int128_aes128ctr.c                           \
	libsodium/crypto_stream/aes128ctr/stream_aes128ctr_api.c                                \
	libsodium/crypto_stream/salsa20/ref/xor_salsa20_ref.c                                   \
	libsodium/crypto_stream/salsa20/ref/stream_salsa20_ref.c                                \
	libsodium/crypto_stream/salsa20/stream_salsa20_api.c                                    \
	libsodium/crypto_stream/crypto_stream.c                                                 \
	libsodium/crypto_stream/aes256estream/hongjun/aes256-ctr.c                              \
	libsodium/crypto_stream/aes256estream/stream_aes256estream_api.c                        \
	libsodium/crypto_scalarmult/crypto_scalarmult.c                                         \
	libsodium/crypto_scalarmult/curve25519/ref/smult_curve25519_ref.c     				    \
	libsodium/crypto_scalarmult/curve25519/ref/base_curve25519_ref.c						\
	libsodium/sodium/core.c                                                                 \
	libsodium/sodium/utils.c                                                                \
	libsodium/sodium/version.c                                                              

SOURCES = $(TOXCORE_SOURCES) $(LIBSODIUM_SOURCES) toxwrap.c
	
INCLUDES=																					\
	-Ilibsodium/include																		\
	-Ilibsodium/include/sodium																\
	-Itoxcore																				\
	-include sodiumdefines.h

CFLAGS=-Wall

EMCC=emcc -O0
CC=gcc -c -std=c99

BC_OBJECTS=$(SOURCES:.c=.bc)

O_OBJECTS=$(SOURCES:.c=.o)

%.bc: %.c
	$(EMCC) $(CFLAGS) $(INCLUDES) $< -o $@

%.o: %.c
	$(CC) $(CFLAGS) $(INCLUDES) $< -o $@
	
toxwrap.js: toxwrap.c $(BC_OBJECTS)
	$(EMCC) $(CFLAGS) $(INCLUDES) $(BC_OBJECTS) -o toxwrap.js

toxwrap: toxwrap.c $(O_OBJECTS)
	$(CC) $(CFLAGS) $(INCLUDES) $(O_OBJECTS) -o toxwrap

clean:
	rm -f toxwrap toxwrap.js toxwrap.js.map $(BC_OBJECTS) $(O_OBJECTS)

nm:
	llvm-nm $(BC_OBJECTS)

all: toxwrap.js
