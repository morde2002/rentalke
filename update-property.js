// Temporary script to update property location
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://jegjrrblllemmvqjxujt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZ2pycmJsbGxlbW12cWp4dWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTAzMDcsImV4cCI6MjA4NDU2NjMwN30.zBVUKXoTsxpa-mQEr67HOW-fy4jEQJGcPdsAjXeJX58'
);

async function updateProperty() {
  // First, let's find properties in Vijiweni
  const { data: properties, error: searchError } = await supabase
    .from('properties')
    .select('id, title, neighborhood, city')
    .eq('neighborhood', 'Vijiweni');

  if (searchError) {
    console.error('Error searching:', searchError);
    return;
  }

  console.log('Found properties in Vijiweni:', properties);

  if (properties && properties.length > 0) {
    // Update the property
    const { data, error } = await supabase
      .from('properties')
      .update({ neighborhood: 'Mtongwe' })
      .eq('id', properties[0].id)
      .select();

    if (error) {
      console.error('Error updating property:', error);
    } else {
      console.log('Property updated successfully:', data);
    }
  }
}

updateProperty();
