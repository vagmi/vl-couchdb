function(doc) {
  if(doc.type=="restaurant") {
  log("Processing doc")
  emit(doc.cuisines[0],1);
  emit(doc.cuisines[1],1);
  emit(doc.cuisines[2],1);
  }
}
