import {
  Box,
  VStack,
  Heading,
  Text,
  HStack,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";
import { Result, Button } from "antd";
import {
  InstagramFilled,
  FacebookFilled,
  YoutubeFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// 🕒 دالة لحساب الوقت المتبقي
function getTimeLeft(targetDate: Date) {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;
  if (distance <= 0) return null;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Success() {
  // 📅 ضع هنا تاريخ بدء السحب (مثلاً اليوم)
  const startDate = new Date("2025-11-02T00:00:00");
  const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); // بعد 30 يوم
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      bgGradient="linear(to-r, #0077b6, #00b4d8, #90e0ef)"
      minH="100vh"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack
        spacing={6}
        textAlign="center"
        bg="rgba(255,255,255,0.15)"
        borderRadius="2xl"
        p={10}
        backdropFilter="blur(10px)"
        boxShadow="2xl"
        w={{ base: "90%", md: "600px" }}
      >
        <Result
          status="success"
          title="🎉 شكراً لمشاركتك!"
          subTitle="تم تسجيلك في السحب بنجاح. تأكد من متابعتنا لمعرفة موعد إعلان الفائز."
        />

        {/* ✅ عداد تنازلي */}
        {timeLeft ? (
          <Box>
            <Heading size="md" mb={2}>
              ⏳ الوقت المتبقي حتى نهاية السحب:
            </Heading>
            <HStack
              justify="center"
              spacing={4}
              fontWeight="bold"
              fontSize="xl"
              color="yellow.200"
            >
              <Text>{timeLeft.days} يوم</Text>
              <Text>{timeLeft.hours} ساعة</Text>
              <Text>{timeLeft.minutes} دقيقة</Text>
              <Text>{timeLeft.seconds} ثانية</Text>
            </HStack>
          </Box>
        ) : (
          <Heading size="md" color="red.300">
            🚨 انتهى وقت السحب!
          </Heading>
        )}

        {/* ✅ روابط المتابعة */}
        <VStack spacing={3}>
          <Text fontSize="lg" mt={4}>
            تابعنا على مواقع التواصل لمعرفة نتيجة السحب 📱
          </Text>
          <HStack spacing={6} fontSize="3xl">
            <ChakraLink
              href="https://www.instagram.com/x.m.a.m.d/"
              target="_blank"
              _hover={{ color: "pink.300", transform: "scale(1.2)" }}
            >
              <Icon as={InstagramFilled} />
            </ChakraLink>
            <ChakraLink
              href="https://web.facebook.com/mostafa.ali.securit.2002"
              target="_blank"
              _hover={{ color: "blue.300", transform: "scale(1.2)" }}
            >
              <Icon as={FacebookFilled} />
            </ChakraLink>
            <ChakraLink
              href="https://www.youtube.com/@MostafaDragmeh"
              target="_blank"
              _hover={{ color: "red.400", transform: "scale(1.2)" }}
            >
              <Icon as={YoutubeFilled} />
            </ChakraLink>
            <ChakraLink
              href="https://wa.me/962789461710"
              target="_blank"
              _hover={{ color: "green.400", transform: "scale(1.2)" }}
            >
              <Icon as={WhatsAppOutlined} />
            </ChakraLink>
          </HStack>
        </VStack>

        {/* ✅ زر العودة */}
        <Button type="primary" size="large">
          <Link to="/">العودة إلى الصفحة الرئيسية</Link>
        </Button>
      </VStack>
    </Box>
  );
}
