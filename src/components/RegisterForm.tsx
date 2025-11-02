import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api";

export default function RegisterForm({ couponCode }: { couponCode: string }) {
  const toast = useToast();
  const nav = useNavigate();
  const [form, setForm] = useState({ fullName: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    // ✅ السماح فقط بالأرقام في حقل الهاتف
    if (key === "phone") {
      value = value.replace(/\D/g, ""); // إزالة أي أحرف غير رقمية
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validatePhone = (phone: string) => {
    // ✅ يجب أن يبدأ بـ07 وطوله 10 أرقام
    const pattern = /^07\d{8}$/;
    return pattern.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ التحقق من الحقول الفارغة
    if (!form.fullName.trim() || !form.phone.trim()) {
      toast({
        title: "⚠️ يرجى تعبئة جميع الحقول",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // ✅ التحقق من صحة رقم الهاتف الأردني
    if (!validatePhone(form.phone)) {
      toast({
        title: "🚫 رقم الهاتف غير صالح",
        description: "الرجاء إدخال رقم أردني صحيح يبدأ بـ07 وطوله 10 أرقام.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/participants/register", {
        couponCode,
        fullName: form.fullName,
        phone: form.phone,
      });

      toast({
        title: "🎉 تم التسجيل بنجاح",
        description: "تم حفظ بياناتك بنجاح، بالتوفيق في السحب!",
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      setTimeout(() => nav("/success"), 1000);
    } catch (err: any) {
      toast({
        title: "حدث خطأ أثناء التسجيل",
        description:
          err?.response?.data?.message ||
          "تحقق من اتصالك بالإنترنت وحاول مرة أخرى.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} textAlign="center" mt={2}>
      <VStack spacing={4}>
        {/* الاسم الكامل */}
        <FormControl isRequired>
          <FormLabel>الاسم الكامل</FormLabel>
          <Input
            size="lg"
            bg="white"
            textAlign="center"
            placeholder="أدخل اسمك الكامل"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </FormControl>

        {/* رقم الهاتف */}
        <FormControl isRequired>
          <FormLabel>رقم الهاتف</FormLabel>
          <Input
            size="lg"
            bg="white"
            textAlign="center"
            dir="ltr"
            maxLength={10}
            placeholder="0789XXXXXX"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          {/* ✅ تلميح صغير باللون الرمادي */}
          <Text fontSize="sm" color="gray.500" mt={1}>
            الرجاء إدخال رقم أردني صالح (يبدأ بـ07 ويتكوّن من 10 أرقام)
          </Text>
        </FormControl>

        {/* زر التسجيل */}
        <Button
          colorScheme="blue"
          size="lg"
          type="submit"
          w="100%"
          isLoading={loading}
          loadingText="جارٍ التسجيل..."
          borderRadius="lg"
        >
          تسجيل
        </Button>
      </VStack>
    </Box>
  );
}
