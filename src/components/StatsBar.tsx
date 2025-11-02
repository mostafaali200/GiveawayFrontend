import { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { api } from "../api";

interface StatsData {
  totalCoupons: number;
  usedCoupons: number;
  participants: number;
}

export default function StatsBar() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const cardBg = useColorModeValue("whiteAlpha.900", "gray.700");
  const shadow = "0 0 15px rgba(0,0,0,0.15)";

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/stats/summary");
        setStats(data);
      } catch (err) {
        console.error("خطأ في جلب الإحصائيات:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="lg" color="blue.400" />
      </Box>
    );

  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      boxShadow={shadow}
      p={6}
      my={6}
      w="100%"
      maxW="800px"
      mx="auto"
    >
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Stat textAlign="center">
          <StatLabel fontSize="lg" color="gray.600">
            إجمالي الأكواد
          </StatLabel>
          <StatNumber fontSize="3xl" fontWeight="bold" color="blue.600">
            {stats?.totalCoupons ?? 0}
          </StatNumber>
          <StatHelpText color="gray.500">كل الرموز الموزعة</StatHelpText>
        </Stat>

        <Stat textAlign="center">
          <StatLabel fontSize="lg" color="gray.600">
            الأكواد المستخدمة
          </StatLabel>
          <StatNumber fontSize="3xl" fontWeight="bold" color="red.500">
            {stats?.usedCoupons ?? 0}
          </StatNumber>
          <StatHelpText color="gray.500">رموز تم تفعيلها بنجاح</StatHelpText>
        </Stat>

        <Stat textAlign="center">
          <StatLabel fontSize="lg" color="gray.600">
            عدد المشاركين
          </StatLabel>
          <StatNumber fontSize="3xl" fontWeight="bold" color="green.500">
            {stats?.participants ?? 0}
          </StatNumber>
          <StatHelpText color="gray.500">المشتركين المسجلين</StatHelpText>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}
