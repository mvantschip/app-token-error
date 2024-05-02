import { defineDb, defineTable, column, NOW } from 'astro:db';

// https://astro.build/db/config
const People = defineTable({
  columns: {
    num : column.number(),
    name : column.text(),
    name2 : column.text({optional: true}),
    name3: column.text({optional: true}),
    name4 : column.text({optional: true}),
    email : column.text(),
    registratiedatum: column.date({default: NOW}),
  }
});

export default defineDb({
  tables: { People }
});
