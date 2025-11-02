import { useState, useRef } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
} from "@chakra-ui/react";
import { api } from "../api";

export default function CheckCouponForm({
  onValid,
}: {
  onValid: (code: string) => void;
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const [dialog, setDialog] = useState({
    title: "",
    message: "",
    isSuccess: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast({
        title: "⚠️ الرجاء إدخال الرمز",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/coupons/check", { code });
      const data = res.data;

      if (data.ok) {
        setDialog({
          title: "تم التحقق بنجاح 🎉",
          message: "الرمز صالح ويمكنك متابعة التسجيل الآن.",
          isSuccess: true,
        });
        onOpen();
      } else {
        setDialog({
          title: "⚠️ الرمز غير صالح",
          message: data.message || "الرمز الذي أدخلته غير صالح أو مستخدم مسبقًا.",
          isSuccess: false,
        });
        onOpen();
      }
    } catch (err: any) {
      toast({
        title: "خطأ أثناء الاتصال بالخادم ⚠️",
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
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg="whiteAlpha.900"
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      textAlign="center"
    >
      <Text fontSize="xl" fontWeight="700" color="#2596be" mb={4}>
        🎟️ تحقق من رمز الاشتراك
      </Text>

      <FormControl mb={4} isRequired>
        <FormLabel textAlign="center" fontWeight="bold">
          أدخل رمز الاشتراك
        </FormLabel>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="مثال: A1B2C3D4E5"
          textAlign="center"
          fontSize="lg"
          letterSpacing={2}
          bg="white"
        />
      </FormControl>

      <Button
        type="submit"
        colorScheme="blue"
        size="lg"
        width="100%"
        isLoading={loading}
        loadingText="جارِ التحقق..."
      >
        تحقق من الرمز
      </Button>

      {/* ✅ نافذة النتائج */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="xl" textAlign="center">
            <AlertDialogHeader
              fontSize="xl"
              fontWeight="bold"
              color={dialog.isSuccess ? "green.500" : "red.500"}
            >
              {dialog.title}
            </AlertDialogHeader>

            <AlertDialogBody fontSize="md">{dialog.message}</AlertDialogBody>

            <AlertDialogFooter justifyContent="center">
              <Button ref={cancelRef} onClick={onClose} variant="outline">
                إغلاق
              </Button>
              {dialog.isSuccess && (
                <Button
                  colorScheme="blue"
                  ml={3}
                  onClick={() => {
                    onClose();
                    onValid(code);
                  }}
                >
                  متابعة التسجيل
                </Button>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
