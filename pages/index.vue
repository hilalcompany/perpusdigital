<template>
  <div class="row">
    <div class="col-lg-12">
      <form @submit.prevent="getData">
        <input
          v-model="keyword"
          type="search"
          class="form-control form-control-lg rounded-pill my-4"
          placeholder="mau baca apa hari ini...."
        />
      </form>
      <div v-if="loading" class="row">
        <div class="col-lg-12">
          <h2 class="text-center py-5">Sedang memuat buku...</h2>
        </div>
      </div>
      <div v-else class="row">
        <div v-if="books.length > 0" class="col-lg-12">
          <div class="row">
            <div v-for="book in books" :key="book.id" class="col-3">
              <div class="card">
                <div class="card-header">
                  <nuxt-link :to="`/detail/${book.id}`">
                    <img :src="book.cover" alt="cover" class="cover" />
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center col-lg-12">
          <h1>😭 Maaf judul "{{ keyword }}" tidak ada</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const keyword = ref("");
const books = ref([]);
const loading = ref(true)

onMounted(() => getData());

async function getData() {
  loading.value = true
  const { data, error } = await supabase
    .from("buku")
    .select(
      `
      id, judul, penulis, penerbit, cover,
      kategori(nama), rak(kode)
    `
    )
    .ilike("judul", `%${keyword.value}%`);
  if (data) {
    books.value = data;
    loading.value = false
  }
  if (error) throw error;
}
</script>

<style scoped>
.cover {
  width: 100px;
}
</style>