<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div v-if="loading">Loading data...</div>
        <div v-else>
          <h1>{{ book.judul }}</h1>
          <div class="row">
            <div class="col-lg-3">
              <img :src="book.cover" alt="cover" class="cover">
            </div>
            <div class="col">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">RAK: {{ book.rak.kode }}</li>
                <li class="list-group-item">KATEGORI: {{ book.kategori.nama }}</li>
                <li class="list-group-item">PENULIS: {{ book.penulis }}</li>
                <li class="list-group-item">PENERBIT: {{ book.penerbit }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const id = route.params.id;
const supabase = useSupabaseClient();
const book = ref([])
const loading = ref(true)

onMounted(() => getData())

async function getData() {
  loading.value = true
  const { data, error } = await supabase
    .from("buku")
    .select(`
      id, judul, penulis, penerbit, cover,
      kategori(nama), rak(kode)
    `)
    .eq('id', id)
  if(data) {
    book.value = data[0]
    loading.value = false
  }
  if(error) throw error
}
</script>


<style scoped>
.cover {
  width: 100%
}
</style>