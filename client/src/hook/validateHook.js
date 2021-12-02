

export default function validateImage (img, toast) {
    var fileSize = document.getElementById(img).files[0].size;
    var siezekiloByte = parseInt(fileSize / 1024);
    if (siezekiloByte > 200) {
      toast({
        title: `Imagen muy grande`,
        status: "error",
        isClosable: true,
      });
      return false;
    }
    return true;
  }  